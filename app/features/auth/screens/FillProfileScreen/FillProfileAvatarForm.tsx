import { observer } from "mobx-react-lite"
import { Box, Column, Icon, IBoxProps, Avatar, ZStack, IconButton } from "native-base"
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { EditSquare, AssetsImage } from "../../../../components"
import { useStores } from "../../../../models"
import * as ImagePicker from 'react-native-image-picker';

/* toggle includeExtra */
const includeExtra = true;

const testUri = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"

interface FillProfileAvatarFormProps extends IBoxProps { }

export const FillProfileAvatarForm = observer(function FillProfileAvatarForm(
  props: FillProfileAvatarFormProps
) {
  const [uri, setUri] = useState(null)
  const [response, setResponse] = useState<any>(null);
  // const [uri, setUri] = useState(testUri)
  const avatarProps = { h: "32", w: "32" }

  useEffect(() => {

    if (response?.assets?.length) {
      setUri(response?.assets[0].uri)
    }

  }, [response])

  const onButtonPress = useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  return (
    <Column
      // backgroundColor={'amber.300'}
      // height="xxl"
      h="32" w="32"
      alignSelf="center"
    >
      <ZStack
        h="32" w="32"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        {
          uri ?
            <Avatar {...avatarProps} source={{ uri: uri }} />
            // <Avatar {...avatarProps} source={{ uri: testUri }} />
            :
            <AssetsImage {...avatarProps} image={"user"} />
        }

        {/* {response?.assets &&
          response?.assets.map(({ uri }: { uri: string }) => (
            <Avatar {...avatarProps} source={{ uri: testUri }} />
          ))} */}
        <Box padding='0' >
          <Icon
            onPress={() => {
              onButtonPress("library", actions[0].options)
            }}
            color='primary.500'
            as={<EditSquare set="bold" size={'large'} />}
          />
        </Box>

      </ZStack>
    </Column >
  )
})

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: `Select Image or Video\n(mixed)`,
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];
