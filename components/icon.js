import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import { StyleSheet, TouchableOpacity,} from "react-native";

const xml = `
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 0H6V6H0V7H6V13H7V7H13V6H7V0Z" fill="#FF6C00"/>
</svg>
`;

export default function IconAdd({ type }) {
  const AddSvg = () => <SvgXml xml={xml} style={styles.icon} />;
  let svg;
  switch (type) {
    case "add":
      svg = <AddSvg />;
      break;
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