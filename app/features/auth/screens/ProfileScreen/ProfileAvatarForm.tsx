import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Box, Column, Icon, IBoxProps, Avatar, ZStack, IconButton, IAvatarProps } from "native-base"
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { EditSquare, AssetsImage } from "../../../../components"
import { useStores } from "../../../../models"
import * as ImagePicker from 'react-native-image-picker';
import { UserAvatar } from "../../components/UserAvatar"

/* toggle includeExtra */
const includeExtra = true;

interface ProfileAvatarFormProps extends IAvatarProps { }

export const ProfileAvatarForm = observer(function ProfileAvatarForm(
  _props: ProfileAvatarFormProps
) {
  const [uri, setUri] = useState(null)
  const [response, setResponse] = useState<any>(null);
  const avatarProps: IAvatarProps = { size: "2xl" }

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
    // <Column h="32" w="32" alignSelf="center" >
    <ZStack h="32" w="32" justifyContent="flex-end" alignItems="flex-end">
      {
        uri ? <Avatar {...avatarProps} source={{ uri: uri }} /> :
          <UserAvatar {...avatarProps} />
      }
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
    // </Column >
  )
})

{/* {response?.assets &&
response?.assets.map(({ uri }: { uri: string }) => (
  <Avatar {...avatarProps} source={{ uri: testUri }} />
))} */}

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
