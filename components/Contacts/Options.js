import _ from 'lodash';

export const getOtherValue = (options, value) => {
    if(value === '' || !value){
        return '';
    }
    const inOptionsList = _.find(options, (o) => { return o.value == value});

    if(inOptionsList){
        return value
    }

    return 'OTHER'
}

export const extractAdditionalRaceEthnicity = (values) => {
    const optionsArray = ['AMERICAN INDIAN OR ALASKA NATIVE', 'ASIAN', 'BLACK OR AFRICAN AMERICAN', 'HISPANIC', 'LATINO', 'NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER', 'WHITE']
    if(values){
        const extraArray = values.filter(e => !optionsArray.includes(e));
        return extraArray.join(', ');
    }
    return [];
}

export const cleanRaceEthnicityArray = (values) => {
    const optionsArray = ['AMERICAN INDIAN OR ALASKA NATIVE', 'ASIAN', 'BLACK OR AFRICAN AMERICAN', 'HISPANIC', 'LATINO', 'NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER', 'WHITE']
    if(values){
        const cleanArray = values.filter(e => optionsArray.includes(e));
        return cleanArray;
    }
    return [];
}


export const sexualOrientationOptions = [
        {
            value: "CHOOSE NOT TO IDENTIFY",
            label: "Choose Not To Identify"
        },
        {
            value: 'STRAIGHT',
            label: 'Straight'
        },
        {
            value: "GAY",
            label: "Gay"
        },
        {
            value: "BISEXUAL",
            label: "Bisexual"
        },
        {
            value: "ASEXUAL",
            label: "Asexual"
        },
        {
            value: "QUEER",
            label: "Queer"
        },
        {
            value: "OTHER",
            label: "Other"
        }
    ]

    export const genderIdentityOptions = [
        {
            value: "CHOOSE NOT TO IDENTIFY",
            label: "Choose Not To Identify"
        },
        {
            value: "WOMAN",
            label: "Woman"
        },
        {
            value: "MAN",
            label: "Man"
        },
        {
            value: "TRANSGENDER",
            label: "Transgender"
        },
        {
            value: "CIS MAN",
            label: "Cis Man"
        },
        {
            value: "CIS WOMAN",
            label: "Cis Woman"
        },
        {
            value: "GENDER NONCONFORMING",
            label: "Gender Non Conforming"
        },
        {
            value: "TRANS MAN",
            label: "Trans Man"
        },
        {
            value: "TRANS WOMAN",
            label: "Trans Woman"
        },
        {
            value: "OTHER",
            label: "Other"
        }
     
    ]

    export const raceEthnicityOptions = [
        {
            value: "AMERICAN INDIAN OR ALASKA NATIVE",
            label: "American Indian or Alaska Native"
        },
        {
            value: 'ASIAN',
            label: 'Asian'
        },
        {
            value: "BLACK OR AFRICAN AMERICAN",
            label: "Black or African American"
        },
        {
            value: "HISPANIC",
            label: "Hispanic"
        },
        {
            value: "LATINO",
            label: "Latino"
        },
        {
            value: "NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER",
            label: "Native Hawaiian or Other Pacific Islander"
        },
        {
            value: "WHITE",
            label: "White"
        }
     
    ]

    export const householdRelationOptions = [
        {
            value: "",
            label: "-- Select --"
        },
        {
            value: "PRIMARY",
            label: "Primary"
        },
        {
            value: 'CHILD',
            label: 'Child'
        },
             {
            value: "ELDER",
            label: "Elder"
        },
        {
            value: 'SIBLING',
            label: 'Sibling'
        },
    ]