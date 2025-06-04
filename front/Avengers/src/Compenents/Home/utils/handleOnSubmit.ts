/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from 'sweetalert2'
import type { CandidateFormState } from '../Interfaces/HomeForm.interface';


export const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>, candidate: CandidateFormState, newCandidate: any) => {
    try {
        e.preventDefault();
        const information: string = await newCandidate(candidate);
        Swal.fire({
            title: information,
            width: 600,
            padding: "3em",
            color: "Red",
            background: `url("https://media.vandal.net/i/1280x720/9-2020/20209911271965_1.jpg.webp") no-repeat center center`, 
        })
    } catch (error: any) {
        Swal.fire({
            title: `${error}`,
            width: 600,
            padding: "3em",
            color: "#fff",
            background: `url("https://mir-s3-cdn-cf.behance.net/project_modules/hd/5c9e06114084301.6034c329b0e28.gif") no-repeat center center`,
        });

        throw error;
    };
};