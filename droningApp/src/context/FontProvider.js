import React, { createContext, useContext } from 'react'
import { OpenSans_400Regular, OpenSans_700Bold, useFonts } from '@expo-google-fonts/open-sans';

const FontContext=createContext()
export const FontProvider({children}) {
    const [fontsLoaded] = useFonts({
        OpenSansRegular: OpenSans_400Regular,
        OpenSansBold: OpenSans_700Bold,
      });
    
  return (
    <FontContext.Provider value={fontsLoaded}>
{children}
    </FontContext.Provider>


  )
}
export const useFontContext=()=>useContext(FontContext)