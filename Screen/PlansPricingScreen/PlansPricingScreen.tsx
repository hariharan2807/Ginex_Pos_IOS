import { View,Text } from "react-native";
import React from "react";
import tailwind from "@tailwind";
import { TopBar } from "../../sharedComponents/atoms/TopBar";
export default function PlansPricingScreen(){
    return(
        <View  style={[tailwind('h-full'),{}]}>
            <TopBar text="Plans & Pricing" type={1}/>
        </View>
    )
}