import * as React from 'react';
import { Image, SvgXml } from 'react-native-svg';
import { StyleSheet, TouchableOpacity,} from "react-native";

import { iconAdd, iconAddPost, iconCamera, iconLogOut, userIcon } from './iconSvg/IconSvg';

export default function IconButton({ type }) {
  const AddSvg = () => <SvgXml xml={iconAdd} style={styles.icon} />;
  const CameraSvg = () => <SvgXml xml={iconCamera} style={styles.icon} />;
  const AddPostSvg = () => <SvgXml xml={iconAddPost} style={styles.icon} />;
  const UserSvg = () => <SvgXml xml={userIcon} style={styles.icon} />;
  const LogOutSvg = () => <SvgXml xml={iconLogOut} style={styles.icon} />;

  let svg;
  switch (type) {
    case "add":
      svg = <AddSvg />;
      break;
    case "user":
      svg = <UserSvg />;
      break;
    case "add-post":
      svg = <AddPostSvg />;
      break;
    case "camera":
      svg = <CameraSvg />;
      break;
    case "log-out":
      svg = <LogOutSvg />;
      break;
    default:
      svg = "";
  }
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
      {svg}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});