/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext } from "react";
import type { CandidateFormState } from "../Compenents/Home/Interfaces/HomeForm.interface";

export interface ICandidateContext {
    newCandidate: (candidate: CandidateFormState) => Promise<string>
}

export const CandidateContext: React.Context<ICandidateContext> = createContext<ICandidateContext>({
    newCandidate: async () => ({} as string)
});

export const CandidateProvider = ({children}: {children: React.ReactNode}) => {
    const newCandidate = async (candidate: CandidateFormState): Promise<string> => {
        try {
            const { data } = await axios.post('http://localhost:3000/candidate', candidate);
            return data;
        } catch ({ response }: any) {
            throw response.data.message;
        };
    };
    const value = {
        newCandidate
    };
    return (
        <CandidateContext.Provider value={value}> 
            {children} 
        </CandidateContext.Provider>
    );
};