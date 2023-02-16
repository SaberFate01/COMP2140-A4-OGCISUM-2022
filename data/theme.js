// Colours

export const colors = {
  //Ogcisum
  purpleColorLighter: '#A42DE8',
  blueColorLighter: '#318AFF',
  blueColorDarker: '#2D3DE8',
  blackColorTranslucentLess: 'rgba(0,0,0,0.35)',
  blackColorTranslucentMore: 'rgba(0,0,0,0.7)',
  light: {
    bgColor: '#ffffff',
    fgColor: '#800080',
    fgColorLighter: 'rgba(128,0,128,0.5)',
    headerTextColor: '#ffffff',
  },
  dark: {
    bgColor: '#422142',
    fgColor: '#f0c4f0',
    fgColorLighter: 'rgba(210,169,210,0.5)',
    headerTextColor: '#f0c4f0',
  },
};

// Sizes

export const sizes = {
  // Global sizes
  base: 8,
  font: 14,

  //radius: 12,
  //padding: 1,
  //width:20,
  //height:10,
  // Font sizes
  heading: 22,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
};

// Fonts

export const fonts = {
  heading: {
    paddingBottom: sizes.padding / 2,
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.heading,
    lineHeight: 30,
  },
  body1: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.body1,
    lineHeight: 36,
  },
  body2: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.body2,
    lineHeight: 30,
  },
  body3: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.body3,
    lineHeight: 22,
  },
  body4: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.body4,
    lineHeight: 22,
  },
  body5: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.body5,
    lineHeight: 22,
  },
};

const appTheme = {colors, sizes, fonts};
export default appTheme;
