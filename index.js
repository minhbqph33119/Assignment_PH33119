/**
 * @format
 */
import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './src/service/trackPlayer'

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);

