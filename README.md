# todo-Mdb4-Angular-Pro
 SME Finance - todo-Mdb4-Angular-Pro project



 ----------------
** Install Nginx: Linux Server:
 URL: https://www.cyberciti.biz/faq/how-to-install-and-use-nginx-on-centos-7-rhel-7/
 ---------------
1. vi /etc/yum.repos.d/nginx.repo
1.1- then copy and paste:
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/rhel/7/$basearch/
gpgcheck=0
enabled=1

2. sudo yum install nginx
3. systemctl enable nginx
4. systemctl start nginx
5. systemctl stop nginx
6. systemctl restart nginx
7. systemctl status nginx
8. firewall-cmd --permanent --zone=public --add-service=http
9. firewall-cmd --permanent --zone=public --add-service=https
10. firewall-cmd --reload
11. ss -tulpn
12. check by your web browser uning IP.


** Uninstall:
1. yum remove nginx

//Build for deployment Angular Project:
1. ng build --named-chunks 


//mdbCharCounter and length into contenteditable Table
<!-- <span
  #span
  (keyup)="span.textContent.length = $event.target.value.length"
  contenteditable="true"
  style="width: 100px; height: 20px; background-color: gray"
>test</span>
<span>{{ span.textContent.length }} / 36</span> -->

//Editable Table value duplicate during blur event prevent
  <!-- <td>
    <span 
    (keyup)="changeValue(id, 'name', $event)" 
    (blur)="updateList(id, 'name', $event)" 
    contenteditable="true" [textContent]="person.name">
    </span>
  </td> -->

  //Idle Time Session out and auto signout
  - Install cmd: npm install bn-ng-idle
  - app.component.ts file funtion:  
     this.bnIdle.startWatching(1800).subscribe((res) => {
      if (res && jwtAuthenticationService.isUserLoggedIn()) {
        alert('Your Session has Expired!! Please Login Again to Proceed...');
        this.router.navigate(['login']);
      }
    });


    //Get/Set Value from Reactive Form 
    ----- cadDocumentUploadForm: FormGroup;

    - this.parameters.customerId = this.cadDocumentUploadForm.get("customerId")!.value;

    - this.cadDocumentUploadForm.controls.documentCode.setValue(reqDocCode);
    - this.cadDocumentUploadForm.controls.custInfoSearch.setValue('');
    - his.cadDocumentUploadForm.get("customerId")!.setValue(custCode);


    ### cmd command: docker-compose up --build
    