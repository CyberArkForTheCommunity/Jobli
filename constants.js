export const BASE_URL = "https://kwqwc5uojf.execute-api.eu-west-1.amazonaws.com/prod";
export const SEEKER_PROFILE_URL = (id) => `${BASE_URL}/api/seekers/${id}/profile`;
export const SEEKER_SUMMARY = () => `${BASE_URL}/api/seekers/summary`;

export const EMPLOYERS = `${BASE_URL}/api/employers`;
export const EMPLOYER = (id) => `${BASE_URL}/api/employers/${id}`;
export const EMPLOYER_JOB_URL = (id) => `${BASE_URL}/api/employers/${id}/job`;
export const SEEKER_PROFILE_ANSWERS_URL = (id) => `${BASE_URL}/api/seeker/${id}/answers`;
export const SEEKER_LANGUAGES_URL = (id) => `${BASE_URL}/api/seeker/${id}/languages`;

// export const BASE_URL = 'https://b1f38ixvz0.execute-api.us-east-1.amazonaws.com/prod';
// export const SEEKER_PROFILE_URL = (id) => `${BASE_URL}/api/seeker/profile`;
// export const SEEKER_PROFILE_ANSWERS_URL = (id) => `${BASE_URL}/api/seeker/answers`;
// export const EMPLOYER_JOB_URL = (id) => `${BASE_URL}/api/employers/job`;
// export const SEEKER_LANGUAGES_URL = `${BASE_URL}/api/seeker/languages`;
