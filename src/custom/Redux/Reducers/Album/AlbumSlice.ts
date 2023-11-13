import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'album',
  initialState: {
    homepage: {},
    album: {},
    currentPlaying:{
        url: localStorage.getItem('current-playing')?JSON.parse(localStorage.getItem('current-playing') ?? '{}'): null
    },
    songClicked: false
  },
  reducers: {
    setHomePage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.homepage = action.payload;
    },
    setAlbum: (state, action) => {
      state.album = action.payload;
    },
    setCurrentPlaying: (state, action) => {
      state.currentPlaying.url = action.payload;
      state.songClicked = true
    },
    setSongClick:(state, action) => {
      state.songClicked = action.payload
    }
  },
});

export const { setHomePage, setAlbum, setCurrentPlaying, setSongClick } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const handleSetHomePage = (homepageData: any) => (dispatch: (arg0: { payload: any; type: "album/setHomePage"; }) => void) => {
  setTimeout(() => {
    dispatch(setHomePage(homepageData));
  }, 1000);
};
// export const incrementAsync = amount => dispatch => {
//       dispatch(incrementByAmount(amount));
//   };
//   export const incrementAsync = amount => dispatch => {
//     setTimeout(() => {
//       dispatch(incrementByAmount(amount));
//     }, 1000);
//   };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const homePageData = (state: { music: { homepage: any; }; }) => {
  return state.music.homepage
};
export const albumData = (state: { music: { album: any; }; }) => state.music.album;
export const currentPlaying = (state: { music: { currentPlaying: { url: any; }; }; }) => state.music.currentPlaying.url;
export const songClicked = (state: { music: { songClicked: any; }; }) => state.music.songClicked;

export default slice.reducer;