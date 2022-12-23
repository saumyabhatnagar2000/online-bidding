import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useData} from './src/hooks/useData';
import {LoginScreen} from './src/screens/Login';
import {Portfolio} from './src/screens/Portfolio';

const Stack = createNativeStackNavigator();
const AuthNav = createNativeStackNavigator();
export default function Navigation() {
  const {authData} = useData();
  console.log(authData);

  return <></>;
}
