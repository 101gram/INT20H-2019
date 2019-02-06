import FormData from 'form-data';
import fetch from "node-fetch";

interface Face {
    attributes: {
        emotion: {
            saddness:  number,
            neutral:   number,
            disgust:   number,
            anger:     number,
            surpise:   number,
            fear:      number,
            happiness: number
        },
    };
}

interface FacePPResponse {
    faces: Face[];
    image_id: string;
    request_id: string;
    time_used: number;
}

export default class FacePlusPlus {
    constructor(private readonly api_key: string, private readonly api_secret: string)
    {}

    async getFacesEmotions(imageUrl: string){
        const body = new FormData();
        body.append("api_key", this.api_key);
        body.append("api_secret", this.api_secret);
        body.append("image_url", imageUrl);
        body.append("return_attributes", "emotion");
        const response = await fetch(
            "https://api-us.faceplusplus.com/facepp/v3/detect",
            {
                body, 
                method: 'post'
            }
        );
        if(!response.ok){
            throw new Error(response.statusText);
        }
        const jsonResponse = await response.json();
        // @TODO check for conformance
        const facesArray = (jsonResponse as FacePPResponse).faces;

        const emotions: string[] = [];
    
        for (const face of facesArray) {
            if (face.attributes) {
                let maxvalue = 0;
                let bestMatchingEmotion = "";
                const { attributes: { emotion } } = face; // nu da. tipa y teba eta tema v obj , a obj v drugom obj
                for (const e in emotion) {
                    if(maxvalue <  emotion[e as keyof typeof emotion]){
                        maxvalue = emotion[e as keyof typeof emotion];
                        bestMatchingEmotion = e;
                    }
                }
                emotions.push(bestMatchingEmotion);
            }
        }
        return emotions;
    }
}