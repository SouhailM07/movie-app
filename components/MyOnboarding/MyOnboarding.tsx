import { Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import { myonboardingStyles } from "./myonboardingStyles.ts";
import tw from "../../lib/tailwind.js";
//
import LottieView from "lottie-react-native";
import Onboarding from "react-native-onboarding-swiper";
import { onboardingPages_t } from "../../types/index.ts";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import onboarding_store from "../../zustand/onboarding_store.js";
import { useEffect } from "react";

// main vars
const { width } = Dimensions.get("window");
// pages array
const onboardingPages: onboardingPages_t[] = [
  {
    backgroundColor: "rgb(30 41 59)",
    title: "Hight Quality",
    img: require("../../assets/animations/hd.json"),
    subtitle: "Watch your movies and series with the highest Quality",
    loop: true,
  },
  {
    backgroundColor: "rgb(99 102 241)",
    img: require("../../assets/animations/coin.json"),
    title: "Low cost",
    subtitle: "You dont need to pay much to watch our movies",
    loop: true,
  },
  {
    img: require("../../assets/animations/popcorn.json"),
    backgroundColor: " rgb(248 113 113)",
    title: "Trending",
    subtitle: "Watch the Most watched and Top rated movies",
    loop: false,
  },
];

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

export default function MyOnboarding() {
  // main vars
  const navigation: any = useNavigation();
  let { editWelcomed } = onboarding_store((state) => state);
  let { welcomed } = onboarding_store((state) => state);
  // handlers
  const handleDone = () => {
    editWelcomed(true);
    navigation.navigate("tabsHome");
  };
  useEffect(() => {
    if (welcomed) {
      navigation.navigate("tabsHome");
    }
  }, []);
  return (
    <>
      <SafeAreaView style={tw`min-h-full w-full`}>
        <Onboarding
          containerStyles={tw`px-2 `}
          subTitleStyles={tw`leading-[1.5rem]`}
          onDone={handleDone}
          onSkip={handleDone}
          DoneButtonComponent={() => <DoneButton h={handleDone} />}
          pages={onboardingPages.map((p) => ({
            ...p,
            image: (
              <LottieView
                style={tw`w-${width / 4.5} aspect-square `}
                autoPlay
                loop={p.loop}
                source={p.img}
              />
            ),
          }))}
        />
      </SafeAreaView>
    </>
  );
}

/*===============================================================================================*/
// small components section
/*===============================================================================================*/

const DoneButton = ({ h }) => {
  return (
    <TouchableOpacity onPress={h} style={tw`px-[2rem]`}>
      <FontAwesomeIcon icon={faCheck} size={26} color="white" />
    </TouchableOpacity>
  );
};
