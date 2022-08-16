import 'react-native'
import reducer, {
  initialState,
  addToWishlist,
  removeFromWishlist,
} from '@/Store/movies'

describe('Movies Reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('Wishlist Reducer', () => {
    it('an addToWishlist action adds the movie to wishlist', () => {
      const movie = { id: 222 }
      const addToWishlistAction = {
        type: addToWishlist.toString(),
        payload: movie,
      }

      expect(reducer(initialState, addToWishlistAction)).toEqual({
        ...initialState,
        wishlist: [movie],
      })
    })

    it('a removeFromWishlist action removes the movie from wishlist', () => {
      const movie = { id: 121 }
      const removeFromWishlistAction = {
        type: removeFromWishlist.toString(),
        payload: movie.id,
      }

      expect(
        reducer(
          { ...initialState, wishlist: [movie] },
          removeFromWishlistAction,
        ),
      ).toEqual({ ...initialState, wishlist: [] })
    })
  })
})
