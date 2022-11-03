import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Constants from "expo-constants";
import {CustomButton} from "../components/CustomButton";
import ErrorMessage from "../components/ErrorMessage";
import NSDTextInput from "../components/NSDTextInput";

const validationSchema = Yup.object().shape({
    email: Yup.string().required('این فیلد ضروری می باشد').email('ایمیل وارد شده معتبر نمی باشد'),
    password: Yup.string().required('این فیلد ضروری می باشد').min(6, 'پسورد نباید کمتر از 6 کاراکتر باشد'),
});

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={values => console.log(values)}
        >
            {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                <>
                        <NSDTextInput
                            iconName='email'
                            iconColor='orangered'
                            autoCorrect={false}
                            autoComplete='email'
                            keyboardType='email-address'
                            placeholder='ایمیل کاربری'
                            placeholderTextColor='gray'
                            autoCapitalize='none'
                            onChangeText={handleChange("email")}
                            onBlur={() => setFieldTouched('email')}
                        />
                    <ErrorMessage error={errors.email} visible={touched.email} />
                        <NSDTextInput
                            iconName='lock'
                            iconColor='orangered'
                            autoCorrect={false}
                            autoComplete='password'
                            placeholder='کلمه عبور'
                            placeholderTextColor='gray'
                            autoCapitalize='none'
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                        />
                    <ErrorMessage error={errors.password} visible={touched.password} />
                    <View style={{marginBottom: 10}}/>
                    <View style={{width: '90%'}}>
                        <CustomButton title='ورود' onPress={handleSubmit} color='tomato' />
                    </View>
                </>
            )}
        </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        marginTop: Constants.statusBarHeight + 30,
    },
    logo: {
        width: 150,
        height: 190,
        marginVertical: 30
    },
    button: {
        marginTop: 20
    }
});

export default LoginScreen;