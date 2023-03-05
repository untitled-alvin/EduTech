import React from "react"
import { colors } from "../../components/EduUIKit/theme"
import { Center, Column } from 'native-base';
import { AssetsImage, EduHeading } from "../../components";
// import { AssetsImage, EduHeading } from "../../components";

export function Dot({ selected }) {
  return <Center
    width={selected ? 8 : 2}
    height={2}
    marginRight={0.5}
    borderRadius={100}
    marginLeft={0.5}
    backgroundColor={selected ? colors.primary : '#E0E0E0'}
  />
}

export function SplashItem({ item }) {
  const { title, image } = item;

  return (
    <Column
      // justifyContent="space-around"
      // justifyContent="space-between"
      justifyContent="flex-start"
      marginLeft={'12'} marginRight={'12'}
      // alignItems="space-between"
      // backgroundColor='blue.100'
      flex={1}
    // alignContent="space-between"
    >
      <AssetsImage
        image={image}
        flex={1}
        marginTop={'4'}
        // size={'60%'}
        // size={'60%'}
        alignSelf={'center'}
        resizeMode="contain"
        alignContent={'flex-start'}
        alignItems={'flex-start'}
      />
      <EduHeading
        text={title}
        preset="h2"
        textAlign='center'
        marginTop={'4'}
        marginBottom={'8'}
      />
    </Column>
  )
}