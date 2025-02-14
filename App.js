import * as React from "react";
import { StatusBar, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { images } from "./src/constants";

// root stack navigation
import RootStack from "./src/navigation";
import OnBoarding from "./src/screens/OnBoarding";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function prepare() {
      try {
        // keeps the splash screen visible while assets are cached
        await SplashScreen.preventAutoHideAsync();

        // pre-load/cache images
        await images.loadAssetsAsync();
      } catch (e) {
        // console.warn(e);
      } finally {
        // loading is complete
        setIsLoading(false);
        console.log("loading complete");
      }
    }

    prepare();
  }, []);

  React.useEffect(() => {
    // when loading is complete
    if (isLoading === false) {
      // hide splash function
      const hideSplash = async () => SplashScreen.hideAsync();

      // hide splash screen to show app
      hideSplash();
    }
  }, [isLoading]);

  if (isLoading) {
    return <></>;
  }

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      {/* <Text>Hello</Text> */}
      <RootStack />
      {/* <OnBoarding /> */}
    </React.Fragment>
  );
};

export default App;
