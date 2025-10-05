import React, { useState } from 'react'
import { Eye, Loader2, ExternalLink, Globe, Hash, Target } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface SearchFormProps {
  onSearchStart: (searchId: string) => void
  onSearchComplete: (results: any[]) => void
}

const countriesByRegion = {
  'North America': [
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Mexico', flag: '🇲🇽' },
  ],
  'Europe': [
    { name: 'Austria', flag: '🇦🇹' },
    { name: 'Belgium', flag: '🇧🇪' },
    { name: 'Bulgaria', flag: '🇧🇬' },
    { name: 'Croatia', flag: '🇭🇷' },
    { name: 'Cyprus', flag: '🇨🇾' },
    { name: 'Czech Republic', flag: '🇨🇿' },
    { name: 'Denmark', flag: '🇩🇰' },
    { name: 'Estonia', flag: '🇪🇪' },
    { name: 'Finland', flag: '🇫🇮' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Greece', flag: '🇬🇷' },
    { name: 'Hungary', flag: '🇭🇺' },
    { name: 'Iceland', flag: '🇮🇸' },
    { name: 'Ireland', flag: '🇮🇪' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'Latvia', flag: '🇱🇻' },
    { name: 'Lithuania', flag: '🇱🇹' },
    { name: 'Luxembourg', flag: '🇱🇺' },
    { name: 'Malta', flag: '🇲🇹' },
    { name: 'Netherlands', flag: '🇳🇱' },
    { name: 'Norway', flag: '🇳🇴' },
    { name: 'Poland', flag: '🇵🇱' },
    { name: 'Portugal', flag: '🇵🇹' },
    { name: 'Romania', flag: '🇷🇴' },
    { name: 'Slovakia', flag: '🇸🇰' },
    { name: 'Slovenia', flag: '🇸🇮' },
    { name: 'Spain', flag: '🇪🇸' },
    { name: 'Sweden', flag: '🇸🇪' },
    { name: 'Switzerland', flag: '🇨🇭' },
    { name: 'Ukraine', flag: '🇺🇦' },
    { name: 'United Kingdom', flag: '🇬🇧' },
  ],
  'Asia Pacific': [
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'India', flag: '🇮🇳' },
    { name: 'Indonesia', flag: '🇮🇩' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'Malaysia', flag: '🇲🇾' },
    { name: 'New Zealand', flag: '🇳🇿' },
    { name: 'Philippines', flag: '🇵🇭' },
    { name: 'Singapore', flag: '🇸🇬' },
    { name: 'South Korea', flag: '🇰🇷' },
    { name: 'Thailand', flag: '🇹🇭' },
    { name: 'Vietnam', flag: '🇻🇳' },
  ],
  'Middle East & Africa': [
    { name: 'Egypt', flag: '🇪🇬' },
    { name: 'Israel', flag: '🇮🇱' },
    { name: 'Morocco', flag: '🇲🇦' },
    { name: 'Saudi Arabia', flag: '🇸🇦' },
    { name: 'South Africa', flag: '🇿🇦' },
    { name: 'Turkey', flag: '🇹🇷' },
    { name: 'United Arab Emirates', flag: '🇦🇪' },
  ],
  'South America': [
    { name: 'Argentina', flag: '🇦🇷' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Chile', flag: '🇨🇱' },
    { name: 'Colombia', flag: '🇨🇴' },
    { name: 'Peru', flag: '🇵🇪' },
  ]
}

export function SearchForm({ onSearchStart, onSearchComplete }: SearchFormProps) {
  const [formData, setFormData] = useState({
    link: '',
    country: '',
    keywords: '',
    count: 10
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      // Create search record in database without user_id
      const { data: search, error: searchError } = await supabase
        .from('searches')
        .insert({
          user_id: '00000000-0000-0000-0000-000000000000',
          link: formData.link,
          country: formData.country,
          keywords_used: formData.keywords,
          count: formData.count,
          status: 'pending'
        })
        .select()
        .single()

      if (searchError) throw searchError

      onSearchStart(search.id)

      // Send to webhook
      const webhookResponse = await fetch('https://primary-production-99d7.up.railway.app/webhook/3ce7d57a-635c-4a5f-bc20-85f23bdec639', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: formData.link,
          country: formData.country,
          keywords_used: formData.keywords,
          count: formData.count,
          search_id: search.id
        })
      })

      if (!webhookResponse.ok) {
        throw new Error('Webhook request failed')
      }

      const results = await webhookResponse.json()

      // Update search status
      await supabase
        .from('searches')
        .update({ status: 'completed' })
        .eq('id', search.id)

      // Store results if they exist
      if (results && Array.isArray(results) && results.length > 0) {
        const searchResults = results.map(result => ({
          search_id: search.id,
          
          // Core identifiers  
          ad_library_url: result.ad_library_url || result.id || '',
          ad_archive_id: result.ad_archive_id || result.page_id || '',
          
          // Location and targeting
          targeted_audience_country: result.targeted_countries_clean || 
            (result.targeted_or_reached_countries && result.targeted_or_reached_countries.length > 0 
              ? result.targeted_or_reached_countries.join(', ') 
              : formData.country) || '',
          
          // Page information
          store_name: result.snapshot?.page_name || 
            result.advertiser?.ad_library_page_info?.page_info?.page_name || 
            result.page_name || '',
          page_profile_url: result.snapshot?.page_profile_uri || 
            result.advertiser?.ad_library_page_info?.page_info?.page_profile_uri || '',
          page_like_count: (result.advertiser?.ad_library_page_info?.page_info?.likes || 
            result.snapshot?.page_like_count || 0).toString(),
          category: result.advertiser?.ad_library_page_info?.page_info?.page_category ||
            (result.snapshot?.page_categories && result.snapshot.page_categories.length > 0 
              ? result.snapshot.page_categories.join(', ') 
              : ''),
          
          // Ad content
          title: result.snapshot?.title || '',
          product_link: result.snapshot?.link_url || result.snapshot?.link_description || result.product_link || '',
          cta_text: result.snapshot?.cta_text || '',
          display_format: result.snapshot?.display_format || '',
          
          // Dates - Fix date parsing
          starting_advertising_date: (() => {
            if (result.start_date_formatted) return result.start_date_formatted;
            if (result.start_date) {
              // Handle both Unix timestamp and date strings
              const date = typeof result.start_date === 'number' 
                ? new Date(result.start_date * 1000) 
                : new Date(result.start_date);
              return !isNaN(date.getTime()) ? date.toLocaleDateString() : '';
            }
            return result.starting_advertising_date || '';
          })(),
          end_date: (() => {
            if (result.end_date_formatted) return result.end_date_formatted;
            if (result.end_date) {
              // Handle both Unix timestamp and date strings  
              const date = typeof result.end_date === 'number'
                ? new Date(result.end_date * 1000)
                : new Date(result.end_date);
              return !isNaN(date.getTime()) ? date.toLocaleDateString() : '';
            }
            return '';
          })(),
          
          // Performance metrics
          reach: (result.aaa_info?.eu_total_reach || result.reach_estimate || result.reach || 0).toString(),
          spend: (() => {
            if (result.spend) return result.spend.toString();
            if (result.snapshot?.spend) return result.snapshot.spend.toString();
            // Check if spend info is nested elsewhere in the response
            if (result.ad_delivery_start_time && result.potential_reach_min) {
              return `${result.potential_reach_min}-${result.potential_reach_max || result.potential_reach_min}`;
            }
            return '';
          })(),
          
          keywords_used: formData.keywords
        }))

        await supabase
          .from('search_results')
          .insert(searchResults)

        onSearchComplete(results)
      } else {
        onSearchComplete([])
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      
      // Update search status to failed if we have a search ID
      try {
        const { data: searches } = await supabase
          .from('searches')
          .select('id')
          .eq('status', 'pending')
          .order('created_at', { ascending: false })
          .limit(1)

        if (searches && searches.length > 0) {
          await supabase
            .from('searches')
            .update({ status: 'failed' })
            .eq('id', searches[0].id)
        }
      } catch (updateError) {
        console.error('Failed to update search status:', updateError)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8 relative overflow-hidden max-w-2xl mx-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Spy on Competitors
            </h2>
            <p className="text-slate-400 text-sm mt-1">Uncover winning ad campaigns and strategies</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
              <ExternalLink className="w-4 h-4 text-blue-400" />
              Facebook Link
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-5 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm"
              placeholder="https://facebook.com/..."
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
              <Globe className="w-4 h-4 text-purple-400" />
              Target Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-5 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white backdrop-blur-sm"
              required
            >
              <option value="" className="bg-slate-800 text-gray-400">🌍 Select a country</option>
              {Object.entries(countriesByRegion).map(([region, countries]) => (
                <optgroup key={region} label={`🌎 ${region}`} className="bg-slate-700 text-white font-semibold">
                  {countries.map(country => (
                    <option 
                      key={country.name} 
                      value={country.name} 
                      className="bg-slate-800 text-white pl-4"
                    >
                      {country.flag} {country.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
              <Hash className="w-4 h-4 text-cyan-400" />
              Keywords Used
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="w-full px-5 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm"
              placeholder="e.g. shoes, fashion, nike"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
              <Target className="w-4 h-4 text-slate-400" />
              Results Count
            </label>
            <div className="mb-2">
              <p className="text-xs text-slate-400">
                ⏱️ <strong>Processing Time:</strong> 2-5 minutes depending on the number of ads
              </p>
              <p className="text-xs text-slate-400">
                💡 <strong>Tip:</strong> More ads = longer processing time, but richer insights
              </p>
            </div>
            <input
              type="number"
              min="1"
              value={formData.count}
              onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) || 1 })}
              className="w-full px-5 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 outline-none transition-all duration-300 text-white backdrop-blur-sm"
              placeholder="No limit - enter any number"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl text-sm backdrop-blur-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white py-5 px-6 rounded-2xl font-semibold text-lg shadow-2xl shadow-red-500/25 hover:shadow-purple-500/25 focus:ring-2 focus:ring-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Processing your search...</span>
              </>
            ) : (
              <>
                <Target className="w-6 h-6" />
                <span>Start Spying on Ads</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}