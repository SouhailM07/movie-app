import "react-native-gesture-handler";
// components
import MyContainer from "./components/MyContainer/MyContainer";
import Toast from "react-native-toast-message";
export default function App() {
  return (
    <>
      <MyContainer />
      <Toast />
    </>
  );
}
