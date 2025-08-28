import React from 'react'
import { ExternalLink, Calendar, Eye, DollarSign, Users, Image as ImageIcon, Hash } from 'lucide-react'

interface InputSearchResult {
  ad_archive_id?: string
  page_id?: string
  is_active?: boolean
  reach_estimate?: number | null
  spend?: string | number | null
  currency?: string
  end_date?: number
  start_date?: number
  start_date_formatted?: string
  end_date_formatted?: string
  publisher_platform?: string[]
  collation_count?: number
  ad_library_url?: string
  targeted_countries_clean?: string
  targeted_or_reached_countries?: string[]
  
  snapshot?: {
    page_name?: string
    page_profile_uri?: string
    page_profile_picture_url?: string
    caption?: string
    cta_text?: string
    display_format?: string
    link_url?: string
    link_description?: string
    title?: string
    page_categories?: string[]
    page_like_count?: number
    body?: {
      text?: string
    }
  }
  
  advertiser?: {
    ad_library_page_info?: {
      page_info?: {
        likes?: number
        page_category?: string
        page_verification?: string
        ig_followers?: number | null
        ig_username?: string | null
        page_profile_uri?: string
        page_name?: string
      }
    }
  }
  
  aaa_info?: {
    eu_total_reach?: number
  }
  
  keywords_used?: string
  id?: string
  targeted_audience_country?: string
  starting_advertising_date?: string
  page_profile_url?: string
  store_name?: string
  reach?: string | number
  page_like_count?: string | number
}

interface SearchResultsRowProps {
  result: InputSearchResult
}

export function SearchResultsRow({ result }: SearchResultsRowProps) {
  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) return '-'
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatPlatforms = (platforms: string[] | undefined) => {
    if (!platforms || platforms.length === 0) return '-'
    return platforms.join(', ')
  }

  const truncateText = (text: string | undefined, maxLength: number = 50) => {
    if (!text) return '-'
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // Extract data from complex nested structure
  const adLibraryUrl = result.ad_library_url || result.id || '-'
  const adId = result.ad_archive_id || result.ad_archive_id || '-'
  const storeName = result.snapshot?.page_name || 
                   result.advertiser?.ad_library_page_info?.page_info?.page_name ||
                   result.store_name || '-'
  const pageProfileUrl = result.snapshot?.page_profile_uri || 
                       result.advertiser?.ad_library_page_info?.page_info?.page_profile_uri ||
                       result.page_profile_url || '-'
  const pageLikes = result.advertiser?.ad_library_page_info?.page_info?.likes || 
                  result.snapshot?.page_like_count ||
                  result.page_like_count || '-'
  const category = result.advertiser?.ad_library_page_info?.page_info?.page_category ||
                 (result.snapshot?.page_categories && result.snapshot.page_categories.length > 0 
                   ? result.snapshot.page_categories.join(', ') 
                   : result.category || '-')
  const country = result.targeted_countries_clean || 
                result.targeted_audience_country || 
                (result.targeted_or_reached_countries && result.targeted_or_reached_countries.length > 0 
                  ? result.targeted_or_reached_countries.join(', ') 
                  : '-')
  const startDate = result.start_date_formatted || formatDate(result.start_date) || result.starting_advertising_date || '-'
  const endDate = result.end_date_formatted || formatDate(result.end_date) || result.end_date || '-'
  const reach = result.aaa_info?.eu_total_reach || result.reach_estimate || result.reach || '-'
  const spend = (() => {
    if (result.spend) return `${result.spend} ${result.currency || ''}`.trim();
    if (result.snapshot?.spend) return `${result.snapshot.spend} ${result.currency || ''}`.trim();
    return '-';
  })()
  const platforms = formatPlatforms(result.publisher_platform || result.publisher_platform)
  const ctaText = result.snapshot?.cta_text || result.cta_text || '-'
  const displayFormat = result.snapshot?.display_format || result.display_format || '-'
  const title = truncateText(result.snapshot?.title || result.title, 50)
  const productLink = result.snapshot?.link_url || result.snapshot?.link_description || result.product_link || '-'
  const isActive = result.is_active !== undefined ? (result.is_active ? 'Active' : 'Inactive') : '-'
  const keywords = result.keywords_used || result.keywords_used || 'placeholder_keywords'

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-3 py-4 whitespace-nowrap">
        {adLibraryUrl !== '-' && adLibraryUrl.startsWith('http') ? (
          <a 
            href={adLibraryUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            <span className="truncate max-w-[180px]" title={adLibraryUrl}>
              {adLibraryUrl}
            </span>
          </a>
        ) : (
          <span className="text-gray-400 text-sm">{adLibraryUrl}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
        {adId !== '-' ? (
          <span title={adId}>{truncateText(adId, 15)}</span>
        ) : (
          <span className="text-gray-400">{adId}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {storeName !== '-' ? storeName : <span className="text-gray-400">{storeName}</span>}
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        {pageProfileUrl !== '-' && pageProfileUrl.startsWith('http') ? (
          <a 
            href={pageProfileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            <span className="truncate max-w-[180px]" title={pageProfileUrl}>
              {pageProfileUrl}
            </span>
          </a>
        ) : (
          <span className="text-gray-400 text-sm">{pageProfileUrl}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {pageLikes !== '-' ? (
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-400" />
            {typeof pageLikes === 'number' ? pageLikes.toLocaleString() : pageLikes}
          </span>
        ) : (
          <span className="text-gray-400">{pageLikes}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {category !== '-' ? category : <span className="text-gray-400">{category}</span>}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {country !== '-' ? country : <span className="text-gray-400">{country}</span>}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {startDate !== '-' ? (
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            {startDate}
          </span>
        ) : (
          <span className="text-gray-400">{startDate}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {endDate !== '-' ? (
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            {endDate}
          </span>
        ) : (
          <span className="text-gray-400">{endDate}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {reach !== '-' ? (
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-gray-400" />
            {typeof reach === 'number' ? reach.toLocaleString() : reach}
          </span>
        ) : (
          <span className="text-gray-400">{reach}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {spend !== '-' ? (
          <span className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            {spend}
          </span>
        ) : (
          <span className="text-gray-400">{spend}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {platforms !== '-' ? (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {truncateText(platforms, 20)}
          </span>
        ) : (
          <span className="text-gray-400">{platforms}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {ctaText !== '-' ? (
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
            {ctaText}
          </span>
        ) : (
          <span className="text-gray-400">{ctaText}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {displayFormat !== '-' ? (
          <span className="flex items-center gap-1">
            <ImageIcon className="w-4 h-4 text-gray-400" />
            {displayFormat}
          </span>
        ) : (
          <span className="text-gray-400">{displayFormat}</span>
        )}
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">
        {title !== '-' ? (
          <span title={result.snapshot?.title}>{title}</span>
        ) : (
          <span className="text-gray-400">{title}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        {productLink !== '-' && productLink.startsWith('http') ? (
          <a 
            href={productLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            <span className="truncate max-w-[180px]" title={productLink}>
              {productLink}
            </span>
          </a>
        ) : (
          <span className="text-gray-400 text-sm">{productLink}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm">
        {isActive !== '-' ? (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isActive === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isActive}
          </span>
        ) : (
          <span className="text-gray-400">{isActive}</span>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        {keywords !== 'placeholder_keywords' ? (
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
            {truncateText(keywords, 20)}
          </span>
        ) : (
          <span className="text-gray-400">{keywords}</span>
        )}
      </td>
    </tr>
  )
}