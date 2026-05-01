export type MovieDates = {
  maximum: string
  minimum: string
};

export type MoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
  dates?: MovieDates
}

export type Movie = {
  id: number
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}