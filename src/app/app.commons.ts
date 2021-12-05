import { ToastService } from "projects/ng-uikit-pro-standard/src/public_api";

export class AppCommons {

    constructor(){}

    /*
        get the message for procedure calling.....
    */
    getProcedureCallToastMsg(code : any, msg : any, toastrService: ToastService){
        if(code === '0'){
            toastrService.success(msg);
        }else if(code === '1' || code === '2'){
            toastrService.error(code + ' - ' + msg);
        }else{
            toastrService.error(code + ' - ' + msg);
        }

    }

}
