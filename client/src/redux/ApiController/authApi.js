import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../features/authSlice";

const USER_API = `${import.meta.env.VITE_BASE_URL || "http://localhost:3000"}/api/auth`;

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),

        verifyOtp : builder.mutation({
            query : (otp) =>({
                url : "verify-otp",
                method : "POST",
                body:otp
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        loginUser: builder.mutation({
            query: (inputData) => ({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try { 
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        loadUser: builder.query({
            query: () => ({
                url:"get-profile",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        updateUser: builder.mutation({
            query: (formData) => ({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        }),

        forgetPassword : builder.mutation({
            query: (phone)=>({
                url : "forget-password",
                method : "POST",
                body:phone
            })
        }),

        forgotPasswordCode : builder.mutation({
            query : (otp) =>({
                url : 'password-code-verification',
                method : "POST",
                body : otp
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        resetPassword: builder.mutation({
            query : (password)=>({
                url : "reset-password",
                method : "POST",
                body : password
            })
        }),


        getAllStudent:builder.query({
            query : ()=>({
                url : "/get-all-student",
                method : "GET"
            })
        })
    })
});
export const {
    useRegisterUserMutation,
    useVerifyOtpMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation,
    useForgetPasswordMutation,
    useForgotPasswordCodeMutation,
    useResetPasswordMutation,
    useGetAllStudentQuery
} = authApi;
