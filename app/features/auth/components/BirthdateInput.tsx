import { Modal } from "native-base"
import React, { FC, useState } from "react"
import { Calendar, EduInput, EduInputProps } from "../../../components"
import { translate } from "../../../i18n"
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import moment from 'moment';

const maximumDate = new Date()
const minimumDate = new Date(1970)

interface BirthdateInputProps {
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
        <EduInput
          key={"birthdate"}
          isReadOnly
          onPressIn={openPicker}
          autoComplete="birthdate-full"
          value={value ? moment(value).format('MM/DD/YYYY') : ""}
          placeholder={translate("common.dateOfBirth")}
          InputRightElement={<Calendar set="curved" size={"small"} />}
        />
      </TouchableOpacity>

      <Modal isOpen={show} onClose={() => setShow(false)}
        justifyContent="flex-end" >
        <Modal.Content width={"full"} borderBottomRadius="none" borderRadius={40} >
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
        </Modal.Content>
      </Modal>
    </View>
  )
}



