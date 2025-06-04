/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext } from "react";
import type { CandidateFormState } from "../Compenents/Home/Interfaces/HomeForm.interface";
import Swal from "sweetalert2";

export interface ICandidateContext {
    newCandidate: (candidate: CandidateFormState) => Promise<string>,
    getPDF: () => Promise<any>
}

export const CandidateContext: React.Context<ICandidateContext> = createContext<ICandidateContext>({
    newCandidate: async () => ({} as string),
    getPDF: async () => ({} as any)
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
    const getPDF = async (): Promise<void> => {
  try {
    const response = await axios.get('http://localhost:3000/candidate/report', {
      responseType: 'blob',
    });
    const blob: Blob = new Blob([response.data], { type: 'application/pdf' });
    const url: string = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'preselected_candidates.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch ({ response }: any) {
    Swal.fire({
      title: 'Error',
      text: response.data.message || 'No se pudo generar el reporte PDF',
      icon: 'error',
      width: 600,
      padding: '3em',
      color: 'Red',
      background: `url("https://media.vandal.net/i/1280x720/9-2020/20209911271965_1.jpg.webp") no-repeat center center`,
    });
    throw error;
  }
};
    const value = {
        newCandidate, getPDF
    };
    return (
        <CandidateContext.Provider value={value}> 
            {children} 
        </CandidateContext.Provider>
    );
};