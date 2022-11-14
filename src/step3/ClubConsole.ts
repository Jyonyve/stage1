import { question } from "readline-sync";
import TravelClub from '../step1/TravelClub';
import ClubCoordinator from './ClubCoordinator';

class ClubConsole{
    //
    clubCoordinator: ClubCoordinator;

    constructor(){
        //
        this.clubCoordinator = new ClubCoordinator();
    }

    showMenu(): void{
        //
        let inputNumber = 0;

        while(true){
            this.displayMainMenu();
            inputNumber = this.selectMainMenu();

            switch(inputNumber){
                case 1:
                    this.register();
                    break;
                case 2 :
                    this.find();
                    break;
                case 3 :
                    this.findAll();
                    break;
                case 0 :
                    this.exitProgram();
                    return;
                default :
                    console.log('Choose Again!');
            }
        }
    }

    displayMainMenu() : void {
        console.log('...................');
        console.log('[Travel Club Menu]');
        console.log('...................');
        console.log('   1. register');
        console.log('   2. find');
        console.log('   3. find all');
        console.log('   0. exit program');
        console.log('...................');
    }

    selectMainMenu() : number {
        const answer = question('select number : ');
        const menuNumber = parseInt(answer);

        if (menuNumber >=0 && menuNumber <= 3){
            return menuNumber;
        }
        console.log('It\'s an invalid number -->' + menuNumber);
        return -1;

    }

    exitProgram() : void {
        console.log('Program Exit, Bye!');
        process.exit(0);
    }

    register() : void {
        const answer = question ('\n input Club Name : ');
        let clubName = answer;

        clubName =clubName.trim();

        if(!clubName || !clubName.length) {
            console.log('Club Name should exist');
            return;
        }

        const foundClub = this.clubCoordinator.exist(clubName);

        if (foundClub) {
            console.log('Club name already exists. --> ' + clubName);
            return;
        }

        let clubIntro = question('Input Club Intro : ');

        clubIntro = clubIntro.trim();

        const newClub = new TravelClub(clubName, clubIntro);
        const savedClubName = this.clubCoordinator.register(newClub);

        if (savedClubName) {
            console.log('\n> Registered Club: ' , newClub);
        }
        else {
            console.log('\n> Same Club Name already exists -->' + clubName);
        }
    }

    find(): void {
        let clubName = '';

        while(true) {
            clubName = this.displayFindMenuAndGetKey();

            if (clubName == '0'){
                return;
            }

            const travelClub = this.clubCoordinator.find(clubName);

            if (travelClub) {
                console.log(' \n> Found Club : ' , travelClub);
                break;
            }
            else {
                console.log('\n> No Such a club : ' + clubName);
            }

        }
    }

    displayFindMenuAndGetKey() : string {
        if(!this.clubCoordinator.hasClubs()){
            console.log('No Clubs in the Storage.');
            return '0';
        }

        const clubName = question('\n Input club name to find (0. previous menu) : ');

        return clubName.trim();
    }

    findAll() : void {
        if (!this.clubCoordinator.hasClubs()){
            console.log('\n> No Clubs in the storage');
            return;
        }

        const clubs = this.clubCoordinator.findAll();

        console.log(' \n> Found ' + clubs.length + ' clubs.');

        for (let i = 0; i <clubs.length ; i++){
            console.log('\n> Found Club : ', clubs[i]);
        }
    }
}
export default ClubConsole;