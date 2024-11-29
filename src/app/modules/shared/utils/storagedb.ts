


const save = (key: string, data: any)=> {
    data = JSON.stringify(data) ?? '';
    localStorage.setItem(key, data);
}

const read = (key: string) => {
    const item = localStorage.getItem(key) ?? '';
    if(!item) {
        return "";
    }

    if(["null", "undefined"].includes(item)) {
        return "";
    }

    return JSON.parse(item);
}

export const StorageDB = { save, read };
