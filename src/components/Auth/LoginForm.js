import React,{useState} from 'react'
import { View, Text } from 'react-native'
import {TextInput, Button} from "react-native-paper";
import {useFormik} from "formik";
import * as Yup from "yup";
import {loginApi} from "../../api/user";
import Toast from "react-native-root-toast";
import {formStyle} from "../../styles"


export default function LoginForm(props) {
    const{changeForm}= props;
    const [ loading, setLoading ] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema:Yup.object(validationSchema()),
        onSubmit: async (formData)=> {
            setLoading(true);
            try {
                const response = await loginApi(formData);
                if (response.statusCode) throw "Error en el usuario o contraseña";
                console.log(response);
            } catch (error) {
                Toast.show(error, {
                  position: Toast.positions.CENTER,
                });
                setLoading(false);
            }
        }
    })
    return (
        <View>
            <TextInput
            label = "Email o Username" style={formStyle.input}
            onChangeText={(text)=> formik.setFieldValue("identifier", text)}
            value ={formik.values.identifier}
            error={formik.errors.identifier}/>
            <TextInput
            label ="Constraseña" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("password",text)}
            secureTextEntry
            value ={formik.values.password}
            error={formik.errors.password}/>
            <Button 
            mode="contained" 
            style={formStyle.btnSuccess}
            onPress={formik.handleSubmit}
            loading={loading}>
                Login
            </Button>
            <Button mode="text" style={formStyle.btnText} labelStyle ={formStyle.btnTextLabel}
            onPress={changeForm}>
                Regritrar
            </Button>
        </View>
    )
}

function initialValues (){
    return{
        identifier :"",
        password : "",
    };
}

function validationSchema(){
    return{
        identifier : Yup.string().required(true),
        password :Yup.string().required(true),
    };
}
