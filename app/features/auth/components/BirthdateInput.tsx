import React, { FC, useState } from "react"
import { Calendar, Input } from "../../../components"
import { translate } from "../../../i18n"
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import moment from 'moment';
import { Adapt, Dialog, Sheet } from "tamagui";

const maximumDate = new Date()
const minimumDate = new Date(1970)

interface BirthdateInputProps {
  error?: boolean
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
}

export const BirthdateInput: FC<BirthdateInputProps> = function BirthdateInput(props) {
  const value = props.value
  const defaultValue = props.defaultValue ?? new Date()
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate: Date) => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const date = selectedDate.getDate()
    const currentDate = new Date(year, month, date, 0, 0, 0)

    props.onChange && props.onChange(currentDate)
    // setDate(currentDate);
  };

  const openPicker = () => {
    if (Platform.OS === "ios") {
      return setShow(true)
    } else {
      DateTimePickerAndroid.open({
        maximumDate,
        minimumDate,
        onChange,
        mode: "date",
        display: "spinner",
        value: value ?? defaultValue
      });
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={openPicker} >
        <Input
          key={"birthdate"}
          pointerEvents="none"
          error={props.error}
          editable={false}
          onPress={openPicker}
          onPressIn={openPicker}
          onPressRightIcon={openPicker}
          autoComplete="birthdate-full"
          value={value ? moment(value).format('MM/DD/YYYY') : ""}
          placeholder={translate("common.dateOfBirth")}
          RightIcon={<Calendar set="curved" />}
        />
      </TouchableOpacity>

      <Dialog modal open={show} onOpenChange={setShow}>
        <Adapt when="sm" platform="touch">
          <Sheet zIndex={200000} modal dismissOnSnapToBottom>
            <Sheet.Overlay bc="black" />
            <Sheet.Frame>
              <Adapt.Contents />
            </Sheet.Frame>
          </Sheet>
        </Adapt>

        <Dialog.Portal>
          <Dialog.Overlay key="overlay" />
          <Dialog.Content key="content" ai="center">
            <SafeAreaView>
              <DateTimePicker
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                value={value ?? defaultValue}
                display="spinner"
                mode={"date"}
                onChange={onChange}
              />
            </SafeAreaView>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  )
}



