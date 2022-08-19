// // to generate doctors and push them to database 
// import { insertMany } from "../models/doctorModel.js";

// import { city, maleImages, femaleImages, certificateImages, clinicImages, emails, clinicNamesArabic, clinicNamesEnglish, FemaleArabicNames, FemaleNames, maleArabicNames, MalefirstName } from './lists.js';
// function doctorGenerator(res) {
//     const specialization = [
//         "Dermatology",
//         "Dentistry",
//         "Psychiatry",
//         "Pediatrics and New Born",
//         "Neurology",
//         "Orthopedics",
//         "Gynaecology and Infertility",
//         "Ear,Nose and Throat",
//         "Cardiology and Vascular Disease",
//         "Allergy abd Immunology",
//         "Andrology and Male Infertility",
//         "Audiology",
//         "Cariology and Thoracic Surgery",
//         "Chest and Respiratory",
//         "Diabetes and Endocrinology",
//         "Diagnostic Radiology",
//         "Dietitian and Nutrition",
//         "Family Medicine",
//         "Gastroenterology and Endoscopy",
//         "General Surgery",
//         "Geriatrics",
//         "Hematology",
//         "Internal Medicine",
//         "IVF and Infertility",
//         "Laboratories",
//         "Neurosurgery",
//         "Obesity and Laparoscopic Surgery",

//     ]

//     const arabicSpecialization = [
//         "الأمراض الجلدية",
//         "طب الأسنان",
//         "الطب النفسي",
//         "طب الأطفال وحديثي الولادة",
//         "علم الأعصاب",
//         "طب العظام",
//         "أمراض النساء والعقم",
//         "انف واذن وحنجرة",
//         "أمراض القلب والأوعية الدموية",
//         "أمراض الحساسية والمناعة",
//         "أمراض الذكورة والعقم عند الذكور",
//         "السمعيات",
//         "جراحة المسالك البولية والصدر",
//         "الصدر والجهاز التنفسي",
//         "السكري والغدد الصماء",
//         "الأشعة التشخيصية",
//         "حمية وتغذية",
//         "طب الأسرة",
//         "أمراض الجهاز الهضمي والتنظير",
//         "الجراحة العامة",
//         "طب الشيخوخة",
//         "أمراض الدم",
//         "الطب الباطني",
//         "أطفال الأنابيب والعقم",
//         "مختبرات",
//         "جراحة الاعصاب",
//         "جراحة السمنة بالمنظار",
//     ]


//     const beginPhoneNumbers = ["010", "011", "012", "015"]
//     const gender = ["male", "female"]
//     const rating = [2.3, 2.5, 3.5, 4.5, 5]
//     const password = ["d", "s", "sd", "lk", "@!#"]
//     const status = ["pending", "accepted", "rejected"]

//     let docsTestList = []
//     let docObject = {}

//     const days = ["saterday", "sunday", "monday", "tuesday", "wednesday", "thrusday", "friday"]
//     const hours = ["03:00pm", "04:00pm", "05:00pm", "06:00pm", "07:00pm", "08:00pm", "09:00pm"]
//     const doctorPadges = ["good listener", "Hygiene", "informative", "friendly"]
//     const entities = ['hospital', 'clinic']

//     let ending = 0;
//     let x = setInterval(() => {
//         for (let index = 0; index < 2000; index++) {
//             let genderType = gender[Math.floor(Math.random() * gender.length)]

//             let MaleName = Math.floor(Math.random() * MalefirstName.length)

//             let secName = Math.floor(Math.random() * MalefirstName.length)
//             let femaleName = Math.floor(Math.random() * FemaleNames.length)
//             let phoneNumber = Math.floor(Math.random() * beginPhoneNumbers.length)
//             let clinics = Math.floor(Math.random() * clinicNamesArabic.length)
//             let specializationIndex = Math.floor(Math.random() * specialization.length)
//             let cityRandom = Math.floor(Math.random() * city.length)
//             let cityRandomSec = Math.floor(Math.random() * city.length)

//             docsTestList.push(docObject = {
//                 doctorName: [
//                     { arabicName: genderType === "male" ? maleArabicNames[MaleName] + " " + maleArabicNames[secName] : (FemaleArabicNames[femaleName] + " " + maleArabicNames[secName]) },

//                     { englishName: genderType === "male" ? MalefirstName[MaleName] + " " + MalefirstName[secName] : FemaleNames[femaleName] + " " + MalefirstName[secName] },

//                 ],
//                 doctorEmail: emails[Math.floor(Math.random() * emails.length)],
//                 doctorPassword: password[Math.floor(Math.random() * password.length)] + Math.floor(Math.random() * 200),
//                 doctorGender: genderType,
//                 doctorLocation: city[cityRandom].places.city,
//                 clinicPhoneNumber: beginPhoneNumbers[phoneNumber] + Math.floor(Math.random() * 123456789),
//                 clinicImagesPath: [{ "image": clinicImages[Math.floor(Math.random() * clinicImages.length)] }, { "image": clinicImages[Math.floor(Math.random() * clinicImages.length)] }, { "image": clinicImages[Math.floor(Math.random() * clinicImages.length)] }],
//                 profileImagePath: genderType === "male" ? maleImages[Math.floor(Math.random() * maleImages.length)].picture.medium : femaleImages[Math.floor(Math.random() * femaleImages.length)].picture.medium,
//                 doctorRating: rating[Math.floor(Math.random() * rating.length)],
//                 fees: Math.floor(Math.random() * 600),
//                 voting: Math.floor(Math.random() * 1234),
//                 clinicWaitingTime: Math.floor(Math.random() * 60),
//                 doctorPadges: doctorPadges[Math.floor(Math.random() * doctorPadges.length)],
//                 profileStatus: status[Math.floor(Math.random() * status.length)],
//                 entity: entities[Math.floor(Math.random() * entities.length)],
//                 doctorSpecialization: [
//                     { specialization_english: specialization[specializationIndex] },
//                     { specialization_arabic: arabicSpecialization[specializationIndex] },
//                 ],

//                 certificateImagePath: certificateImages[Math.floor(Math.random() * certificateImages.length)],
//                 doctorClinics: [
//                     {
//                         clinicAppointment: [
//                             { time1: hours[Math.floor(Math.random() * hours.length)], day1: days[Math.floor(Math.random() * days.length)] },
//                             { time2: hours[Math.floor(Math.random() * hours.length)], day2: days[Math.floor(Math.random() * days.length)] },
//                             { time3: hours[Math.floor(Math.random() * hours.length)], day3: days[Math.floor(Math.random() * days.length)] },
//                         ],


//                         place: [
//                             { placeEnglish: city[cityRandom].places.firstEnglishName, placeArabic: city[cityRandom].places.firstArabicName, },
//                             { clinicEnglishName: clinicNamesEnglish[clinics], clinicArabicName: clinicNamesArabic[clinics] }
//                         ]

//                     },
//                     {
//                         clinicAppointment: [
//                             { sectime1: hours[Math.floor(Math.random() * hours.length)], secday1: days[Math.floor(Math.random() * days.length)] },
//                             { sectime2: hours[Math.floor(Math.random() * hours.length)], secday2: days[Math.floor(Math.random() * days.length)] },
//                             { sectime3: hours[Math.floor(Math.random() * hours.length)], secday3: days[Math.floor(Math.random() * days.length)] },
//                         ],


//                         place: [
//                             { placeEnglish: city[cityRandomSec].places.secondEnglishName, placeArabic: city[cityRandomSec].places.secondArabicName, },
//                             { clinicEnglishName: clinicNamesEnglish[clinics], clinicArabicName: clinicNamesArabic[clinics] },
//                         ]



//                     },
//                 ],

//             })


//         }
//         console.log(docsTestList)

//         //res.json({body:docsTestList})

//         insertMany(docsTestList).then(result => res.json({
//             message: "succssess",
//             body: result
//         })).catch(e => res.json({ body: e }))
//         ending++
//     }, 12000)

//     if (ending == 6) {
//         clearTimeout(x)
//     }
// }



// export default { doctorGenerator }