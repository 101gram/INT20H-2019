type ObjectId = import('mongoose').Types.ObjectId;

export class NotFoundError extends Error {
    constructor(errorMessage = 'nothing was found'){
        super(errorMessage);
    }
}

export class IdNotFoundError extends NotFoundError {
    constructor(id: ObjectId, targetName = 'instance') {
        super(`no '${targetName}' was found for id '${id}'`);
    }
}
