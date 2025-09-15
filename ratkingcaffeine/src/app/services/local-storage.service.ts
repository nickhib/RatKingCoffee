import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    }
    catch (e){
        console.error('Error local storage saving',e);
    }
  }
  //use any so we can return any value 
  getItem(key: string): any
  {
    try{
     const item = localStorage.getItem(key);
     return item ? JSON.parse(item) : null;
    }
    catch (e)
    {
      console.error('Error reading from local storage',e);
      return null;
    }
  }

  removeItem(key: string): void
  {
    try
    {
      localStorage.removeItem(key);
    }
    catch(e)
    {
      console.error('Error removing item from local storage', e);
    }
  }
  clear() : void {
    try
    {
      localStorage.clear();
    }
    catch(e)
    {
      console.error('Error clearing local storage',e);
    }
  }
}
