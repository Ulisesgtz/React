import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyle = StyleSheet.create({
    input: {
        marginBottom : 20,
    },
    btnSuccess:{
        padding : 5,
        backgroundColor : colors.primary,
    },
    bntText :{
        marginTop : 10,
    },
    btnTextLabel:{
        color : colors.dark,
    },
});

export default formStyle;