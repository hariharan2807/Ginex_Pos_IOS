import tailwind from "@tailwind";
import { View ,Text} from "react-native";
import React from "react";
import { TopBar } from "../../sharedComponents/atoms/TopBar";
export default function EditProfileScreen(){
    return(
    <View style={[tailwind('h-full'),{}]}>
       <TopBar text="Edit Profile"/>
    </View>
    )
}