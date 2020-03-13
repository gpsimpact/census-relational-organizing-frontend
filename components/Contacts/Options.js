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

export const sexualOrientationOptions = (t) => {
    return [
        {
            value: "CHOOSE NOT TO IDENTIFY",
            label: t("CHOOSE NOT TO IDENTIFY")
        },
        {
            value: 'STRAIGHT',
            label: t('STRAIGHT')
        },
        {
            value: "GAY",
            label: t('GAY')
        },
        {
            value: "BISEXUAL",
            label: t('BISEXUAL')
        },
        {
            value: "ASEXUAL",
            label: t("ASEXUAL")
        },
        {
            value: "QUEER",
            label: t("QUEER")
        },
        {
            value: "OTHER",
            label: t("OTHER")
        }
    ]
}

    export const genderIdentityOptions = (t) => {
    return [
        {
            value: "CHOOSE NOT TO IDENTIFY",
            label: t("CHOOSE NOT TO IDENTIFY")
        },
        {
            value: "WOMAN",
            label: t('WOMAN')
        },
        {
            value: "MAN",
            label: t("MAN")
        },
        {
            value: "TRANSGENDER",
            label: t("TRANSGENDER"),
        },
        {
            value: "CIS MAN",
            label: t("CIS MAN")
        },
        {
            value: "CIS WOMAN",
            label: t("CIS WOMAN")
        },
        {
            value: "GENDER NONCONFORMING",
            label: t("GENDER NONCONFORMING")
        },
        {
            value: "TRANS MAN",
            label: t("TRANS MAN")
        },
        {
            value: "TRANS WOMAN",
            label: t("TRANS WOMAN")
        },
        {
            value: "OTHER",
            label: t("OTHER")
        }
     
    ]
    }
    


    export const raceEthnicityOptions = (t) => {
        return [
        {
            value: "AMERICAN INDIAN OR ALASKA NATIVE",
            label: t('AMERICAN INDIAN OR ALASKA NATIVE')
        },
        {
            value: 'ASIAN',
            label: t('ASIAN')
        },
        {
            value: "BLACK OR AFRICAN AMERICAN",
            label: t("BLACK OR AFRICAN AMERICAN")
        },
        {
            value: "HISPANIC",
            label: t("HISPANIC")
        },
        {
            value: "LATINO",
            label: t("LATINO")
        },
        {
            value: "NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER",
            label: t("NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER")
        },
        {
            value: "WHITE",
            label: t("WHITE")
        }
     
    ]
    }

    export const householdRelationOptions = (t) => 
    {
    return [
        {
            value: "",
            label: t('--Select--')
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
    }