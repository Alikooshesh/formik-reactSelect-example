import React, {useEffect, useState} from 'react';
import {Formik, Form, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import MyInput from "./myInput";
import MySelect from "./mySelect";
import axios from "axios";
import BoxStyle from "./boxStyle";

const phoneRegExp = /^(\+|0)?\d{5,15}$/

const validationSchema = Yup.object().shape({
    companyName: Yup.string()
        .min(2, 'Too Short!')
        .required('company name is required'),
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .required('your name is required'),
    email: Yup.string().email('Invalid email').required('Required'),
    countrySelect : Yup.object().nullable().required('country is required'),
    phoneNum : Yup.string().matches(phoneRegExp,'phone number is invalid').required('phone number is required')
});

export const MyForm = () => {

    const [countries , setCountries] = useState<any>(null)
    const [states , setStates] = useState<any>(null)

    const [selectedCountry , setSelectedCountry] = useState<string | null>(null)

    useEffect(()=> {
        axios.get('https://countriesnow.space/api/v0.1/countries')
            .then(data => {
                let myData:any = data.data
                setCountries(myData.data.map((item:any)=> {
                    return {value : item.country , label : item.country}
                }))
            })
            .catch(e => console.log(e))
    },[])

    useEffect(()=>{
        setStates(null)
        if (selectedCountry){
            axios.post('https://countriesnow.space/api/v0.1/countries/states',{"country": selectedCountry})
                .then((date:any) =>{
                    setStates(date.data.data.states.map((item:any) => {return {value : item.name , label : item.name}}))
                })
                .catch(e => console.log(e))
        }
    },[selectedCountry])

    return(
        <div>
            <Formik
                initialValues={{
                    companyName: '',
                    fullName: '',
                    email: '',
                    phoneNum : '',
                    countrySelect: null,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                       <>
                           <BoxStyle title={'Billing information'} description={'The following info ...'}>
                               <div className={'px-3'}>
                                   <MyInput name={'companyName'} label={'company name'} required={true}/>
                                   <MyInput name={'fullName'} label={'full name'} required={true}/>
                               </div>
                           </BoxStyle>

                           <BoxStyle title={'Billing Address'} className={'mt-2'}>
                               <div className={'px-3'}>
                                   <div className={'w-100 d-flex flex-row'}>
                                       <MySelect name={'countrySelect'} label={'country'} options={countries} sendValue={setSelectedCountry} className={'w-50 me-1'} required={true}/>
                                       <MySelect name={'stateSelect'} label={'state'} options={states} isDisabled={states && states.length>0 ? false : true} required={states && states.length>0 ? true : false} className={'w-50'}/>
                                   </div>
                                   <MyInput name={'phoneNum'} label={'phone number'} required={true}/>
                                   <MyInput name={'email'} label={'email address'} required={true}/>
                               </div>
                           </BoxStyle>

                           <button type="submit">Submit</button>
                       </>
                    </Form>

                )}
            </Formik>
        </div>
    )
}
