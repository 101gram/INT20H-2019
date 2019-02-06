import FormData from 'form-data';
import fetch from "node-fetch";

interface Face {
    attributes: {
        beauty: {
            female_score: number;
            male_score:   number;
        },
        emotion: {
            saddness: number,
            neutral:   number,
            disgust: number,
            anger:   number,
            surpise: number,
            fear:   number,
            happiness: number,
            [key: string]: number
        },
    };
}

interface FacePPResponse {
    faces: Face[];
    image_id: string;
    request_id: string;
    time_used: number;
}

class FacePlusPlus {
    constructor(private readonly api_key: string, private readonly api_secret: string)
    {

    }

    async getFacesEmotions(imageUrl: string){
        const body = new FormData();
        body.append("api_key", this.api_key);
        body.append("api_secret", this.api_secret);
        body.append("image_url", imageUrl);
        body.append("return_attributes", "beauty,emotion");
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
        const res = jsonResponse as FacePPResponse;
        const facesArray: Face[] = res.faces;

        const emotions : string[] = new Array();
    
        for(const face of facesArray){
            if(face.attributes){
                let maxvalue = 0;
                let bestMatchingEmotion: string = "";
                for(const emotion in face.attributes.emotion){
                    if(maxvalue < face.attributes.emotion[emotion]){
                        maxvalue = face.attributes.emotion[emotion];
                        bestMatchingEmotion = emotion;
                    }
                }
                emotions.push(bestMatchingEmotion);
            }
        }
        return emotions;
    }
}

export {FacePlusPlus};