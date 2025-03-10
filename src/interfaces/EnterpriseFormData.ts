export interface EnterpriseFormData {
    enterpriseId: string;
    userId: string;
    enterpriseName: string;
    enterpriseEmail: string;
    registerNumber: string;
    enterpriseType: string;
    startingDate: string;
    address: string;
    city: string;
    telNumber: string;
    webUrl: string;
    imageName: string;
    imageFile: File | null; // Base64 encoded string
    contentType: string;
}