import doctorModel from "../../models/doctorModel.js";

function searchController(req, res) {
    // queries
    const doctorNameEnglish = req.query.doctorNameEnglish || '';
    const doctorNameArabic = req.query.doctorNameArabic || '';
    const doctorSpecializationArabic = req.query.doctorSpecializationArabic || '';
    const doctorSpecializationEnglish = req.query.doctorSpecializationEnglish || '';
    const doctorGender = req.query.doctorGender || '';
    const doctorEntity = req.query.doctorEntity || '';
    const doctorLocation = req.query.doctorLocation || '';

    const doctorSorting = req.query.doctorSorting || '';
    const page = req.query.page || 1;
    // pagination
    const pageLimit = 25;
    let totalDoctors;



    if (Object.keys(req.query).includes('page') && Object.keys(req.query).length === 1) {
        doctorModel.find({
            profileStatus: "accepted",

        }).countDocuments().then(count => {
            totalDoctors = count;
            return doctorModel.find({
                profileStatus: "accepted",
            }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: -1 });
        }).then(result => {
            res.status(200).json({
                page: parseInt(page),
                totalPages: Math.ceil(totalDoctors / pageLimit),
                totalDoctors: totalDoctors,
                body: result
            })
        }).catch(e => res.status(400).json({
            message: "there is an error",
            body: e
        }))

    }
    // doctorModel.find english name only 
    else if (doctorNameEnglish !== '' && doctorNameArabic === '') {
        doctorModel.find({

            profileStatus: "accepted",
            doctorName: { $elemMatch: { englishName: { $regex: doctorNameEnglish, $options: "i" } } },

        }).countDocuments().then(count => {
            totalDoctors = count;
            return doctorModel.find({
                profileStatus: "accepted",
                doctorName: { $elemMatch: { englishName: { $regex: doctorNameEnglish, $options: "i" } } },

            }).skip((page - 1) * pageLimit).limit(pageLimit);
        }).then(result => {
            res.status(200).json({
                page: parseInt(page),
                totalPages: Math.ceil(totalDoctors / pageLimit),
                totalDoctors: totalDoctors,
                body: result
            })
        }).catch(e => res.status(400).json({
            message: "there is an error",
            body: e
        }))
    }
    // doctorModel.find arabic name only 
    else if (doctorNameEnglish === '' && doctorNameArabic !== '') {
        doctorModel.find({

            profileStatus: "accepted",
            doctorName: { $elemMatch: { arabicName: { $regex: doctorNameArabic, $options: "i" } } }

        }).countDocuments().then(count => {
            totalDoctors = count;
            return doctorModel.find({

                profileStatus: "accepted",
                doctorName: { $elemMatch: { arabicName: { $regex: doctorNameArabic, $options: "i" } } }

            }).skip((page - 1) * pageLimit).limit(pageLimit);
        }).then(result => {
            res.status(200).json({
                page: parseInt(page),
                totalPages: Math.ceil(totalDoctors / pageLimit),
                totalDoctors: totalDoctors,
                body: result
            })
        }).catch(e => res.status(400).json({
            message: "there is an error",
            body: e
        }))
    }
    // gender and location and specialization (arabic or english)
    else if (doctorGender !== '' && doctorLocation !== '' && (doctorSpecializationEnglish !== '' || doctorSpecializationArabic !== '') && doctorEntity === '') {
        if (doctorSorting === 'highestRate') {
            doctorModel.find({

                profileStatus: "accepted",
                doctorGender: doctorGender, doctorLocation: doctorLocation,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    doctorGender: doctorGender, doctorLocation: doctorLocation, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: -1 });
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))

        }

        else if (doctorSorting === 'lowestRate') {
            doctorModel.find({

                profileStatus: "accepted",
                doctorGender: doctorGender, doctorLocation: doctorLocation,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    doctorGender: doctorGender, doctorLocation: doctorLocation, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: 1 });
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))

        }
        else {
            doctorModel.find({

                profileStatus: "accepted",
                doctorGender: doctorGender, doctorLocation: doctorLocation,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    doctorGender: doctorGender, doctorLocation: doctorLocation, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit);
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }

    }
    // entity and specialization (arabic or english)
    else if (doctorGender === '' && doctorLocation === '' && (doctorSpecializationEnglish !== '' || doctorSpecializationArabic !== '') && doctorEntity !== '') {
        if (doctorSorting === 'highestRate') {
            doctorModel.find({

                profileStatus: "accepted",
                entity: doctorEntity,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    entity: doctorEntity, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: -1 });;
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }
        else if (doctorSorting === 'lowestRate') {

            doctorModel.find({

                profileStatus: "accepted",
                entity: doctorEntity,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    entity: doctorEntity, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: 1 });
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }
        else {
            doctorModel.find({

                profileStatus: "accepted",
                entity: doctorEntity,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    entity: doctorEntity, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit);
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }


    }
    // gender  and specialization (arabic or english)
    else if (doctorGender !== '' && doctorLocation === '' && (doctorSpecializationEnglish !== '' || doctorSpecializationArabic !== '') && doctorEntity === '') {

        if (doctorSorting === 'highestRate') {

            doctorModel.find({

                profileStatus: "accepted",
                doctorGender: doctorGender,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    doctorGender: doctorGender, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: -1 });
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))

        }
        else if (doctorSorting === ' lowestRating') {
            doctorModel.find({

                profileStatus: "accepted",
                doctorGender: doctorGender,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    doctorGender: doctorGender, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: 1 });
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }
        else {
            doctorModel.find({

                profileStatus: "accepted",
                doctorGender: doctorGender,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    doctorGender: doctorGender, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit);
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }


    }
    // location and specialization (arabic or english)
    else if (doctorGender === '' && doctorLocation !== '' && (doctorSpecializationEnglish !== '' || doctorSpecializationArabic !== '') && doctorEntity === '') {

        if (doctorSorting === 'highestRate') {
            doctorModel.find({

                profileStatus: "accepted",
                doctorLocation: doctorLocation,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    doctorLocation: doctorLocation, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: -1 });
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }
        else if (doctorSorting === 'lowestRating') {
            doctorModel.find({

                profileStatus: "accepted",
                doctorLocation: doctorLocation,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    doctorLocation: doctorLocation, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: 1 });
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }
        else {
            doctorModel.find({

                profileStatus: "accepted",
                doctorLocation: doctorLocation,
                $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    doctorLocation: doctorLocation, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }]

                }).skip((page - 1) * pageLimit).limit(pageLimit);
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }
    }
    // gender ,location, entity  and specialization  (arabic or english)
    else if (doctorGender !== '' && doctorEntity !== '' && doctorLocation !== '' && (doctorSpecializationEnglish !== '' || doctorSpecializationArabic !== '')) {

        if (doctorSorting === 'highestRate') {
            doctorModel.find({

                profileStatus: "accepted",
                entity: doctorEntity, doctorGender: doctorGender, doctorLocation: doctorLocation, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }],

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    entity: doctorEntity, doctorGender: doctorGender, doctorLocation: doctorLocation, doctorSpecialization: { $elemMatch: { specialization_english: doctorSpecializationEnglish } },

                }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: -1 });
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }
        else if (doctorSorting === 'lowestRate') {
            doctorModel.find({

                profileStatus: "accepted",
                entity: doctorEntity, doctorGender: doctorGender, doctorLocation: doctorLocation, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }],

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    entity: doctorEntity, doctorGender: doctorGender, doctorLocation: doctorLocation, doctorSpecialization: { $elemMatch: { specialization_english: doctorSpecializationEnglish } },

                }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: 1 });
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }
        else {
            doctorModel.find({

                profileStatus: "accepted",
                entity: doctorEntity, doctorGender: doctorGender, doctorLocation: doctorLocation, $or: [{ 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  }, { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }],

            }).countDocuments().then(count => {
                totalDoctors = count;
                return doctorModel.find({
                    profileStatus: "accepted",

                    entity: doctorEntity, doctorGender: doctorGender, doctorLocation: doctorLocation, doctorSpecialization: { $elemMatch: { specialization_english: doctorSpecializationEnglish } },

                }).skip((page - 1) * pageLimit).limit(pageLimit);
            }).then(result => {
                res.status(200).json({
                    page: parseInt(page),
                    totalPages: Math.ceil(totalDoctors / pageLimit),
                    totalDoctors: totalDoctors,
                    body: result
                })
            }).catch(e => res.status(400).json({
                message: "there is an error",
                body: e
            }))
        }

    }
    // to choose 1 query
    else if (Object.keys(req.query).includes('page') && Object.keys(req.query).length === 2 || Object.keys(req.query).length === 1) {

        // check for 2 queries only
        doctorModel.find({
            $and: [
                { profileStatus: "accepted" },
                {
                    $or: [
                        // specialization

                        {

                            $or: [
                                { 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  },
                                { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }
                            ]


                        },
                        // gender 
                        {
                            doctorGender: doctorGender,


                        },

                        // location 
                        {
                            doctorLocation: doctorLocation

                        },

                        //entity
                        { entity: doctorEntity },

                    ]
                }
            ]

        }).countDocuments().then(count => {
            totalDoctors = count;
            return doctorModel.find({
                $and: [
                    { profileStatus: "accepted" },
                    {
                        $or: [
                            // specialization

                            {

                                $or: [
                                    { 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  },
                                    { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }
                                ]


                            },
                            // gender 
                            {
                                doctorGender: doctorGender,


                            },

                            // location 
                            {
                                doctorLocation: doctorLocation

                            },

                            //entity
                            { entity: doctorEntity },

                        ]
                    }
                ]
            }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: -1 });
        }).then(result => {
            res.status(200).json({
                page: parseInt(page),
                totalPages: Math.ceil(totalDoctors / pageLimit),
                totalDoctors: totalDoctors,
                body: result
            })
        }).catch(e => res.status(400).json({
            message: "there is an error",
            body: e
        }))

    }
    // to choose 2 queries only 
    else if (Object.keys(req.query).includes('page') && Object.keys(req.query).length === 3 || Object.keys(req.query).length === 2) {
        console.log("right")
        // check for 2 queries only
        doctorModel.find({
            $and: [
                { profileStatus: "accepted" },
                {
                    $or: [
                        // entity and specialization 
                        {
                            $and: [{ entity: doctorEntity }, {
                                $or: [
                                    { 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  },
                                    { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }
                                ]

                            }]
                        },
                        // gender and specialization
                        {
                            $and: [{ doctorGender: doctorGender }, {
                                $or: [
                                    { 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  },
                                    { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }
                                ]

                            }]
                        },

                        // location and specialization
                        {
                            $and: [{ doctorLocation: doctorLocation }, {
                                $or: [
                                    { 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  },
                                    { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }
                                ]

                            }]
                        },

                        // location and gender 
                        {
                            $and: [{ doctorLocation: doctorLocation }, { doctorGender: doctorGender }]
                        },
                        // location and entity
                        {
                            $and: [{ doctorLocation: doctorLocation }, { entity: doctorEntity }]
                        },
                        // entity and gender
                        {
                            $and: [{ doctorGender: doctorGender }, { entity: doctorEntity }]
                        },




                    ]
                }
            ]

        }).countDocuments().then(count => {
            totalDoctors = count;
            return doctorModel.find({
                $and: [
                    { profileStatus: "accepted" },
                    {
                        $or: [
                            // entity and specialization 
                            {
                                $and: [{ entity: doctorEntity }, {
                                    $or: [
                                        { 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  },
                                        { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }
                                    ]

                                }]
                            },
                            // gender and specialization
                            {
                                $and: [{ doctorGender: doctorGender }, {
                                    $or: [
                                        { 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  },
                                        { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }
                                    ]

                                }]
                            },

                            // location and specialization
                            {
                                $and: [{ doctorLocation: doctorLocation }, {
                                    $or: [
                                        { 'doctorSpecialization.specialization_english': doctorSpecializationEnglish  },
                                        { 'doctorSpecialization.specialization_english': doctorSpecializationArabic }
                                    ]

                                }]
                            },

                            // location and gender 
                            {
                                $and: [{ doctorLocation: doctorLocation }, { doctorGender: doctorGender }]
                            },
                            // location and entity
                            {
                                $and: [{ doctorLocation: doctorLocation }, { entity: doctorEntity }]
                            },
                            // entity and gender
                            {
                                $and: [{ doctorGender: doctorGender }, { entity: doctorEntity }]
                            },




                        ]
                    }
                ]
            }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: -1 });;
        }).then(result => {
            res.status(200).json({
                page: parseInt(page),
                totalPages: Math.ceil(totalDoctors / pageLimit),
                totalDoctors: totalDoctors,
                body: result
            })
        }).catch(e => res.status(400).json({
            message: "there is an error",
            body: e
        }))

    }

    else {
        doctorModel.find({
            profileStatus: "accepted",

        }).countDocuments().then(count => {
            totalDoctors = count;
            return doctorModel.find({
                profileStatus: "accepted",
            }).skip((page - 1) * pageLimit).limit(pageLimit).sort({ doctorRating: -1 });
        }).then(result => {
            res.status(200).json({
                page: parseInt(page),
                totalPages: Math.ceil(totalDoctors / pageLimit),
                totalDoctors: totalDoctors,
                body: result
            })
        }).catch(e => res.status(400).json({
            message: "there is an error",
            body: e
        }))

    }

}





export { searchController }