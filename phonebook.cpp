#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;
struct PhoneRecord
{
    string name;
    string number;
};
const string FILE_NAME = "phonerecords.txt";
int main()
{
    ifstream fin(FILE_NAME);
    if (!fin.is_open())
    {
        cout << FILE_NAME << " cannot be open!";
        return 0;
    }
    //*******************************************
    // TODO Part 1 - READING from file - ADDING to a vector
    // 1- Read each phone record and create PhoneRecord object
    // 2- Add the PhoneRecord object to vector
    // 3- Repeat the above steps until you reach end of the file
    // YOUR CODE PART 2 BEGINS
    vector<PhoneRecord> yellow;
    string line = "";
    int i = 0;
    while (!fin.eof())
    {
        PhoneRecord newRecord;
        getline(fin, newRecord.name);
        getline(fin, newRecord.number);
        yellow.push_back(newRecord);
        cout << newRecord.name << "\t" << newRecord.number << endl;
        i++;
    }
    //*******************************************
    // TODO Part 2 - SEARCHING in vector
    // 1- Ask user a name via console,
    // 2- Search that name in vector
    // 3- if the name searched exists in the vector show the phone number
    // 4- If not, display no record found with that name.
    // YOUR CODE PART 2
    string search;
    bool found = false;
    cout << "Who are you looking for: ";
    cin >> search;

    for (int i = 0; i < yellow.size(); i++) {
        if (yellow[i].name == search) {
            cout << yellow[i].number;
            found = true;
        };
    }
    if (found == false) { cout << "No match found." << endl; }

    //*******************************************
    // TODO Part 3 - OPTIONAL - UPDATING data in vector
    // 1- Ask user a name via console,
    // 2- Search that name in vector
    // 3- If found update the phone number via new phone number entered via console
    // YOUR CODE PART 3
    cout << "Thank you!\n";
}



chatgpt fixed it:
vector<PhoneRecord> yellow;
string line;
// FIXED file reading
while (getline(fin, line)) {
    PhoneRecord newRecord;
    newRecord.name = line;

    if (!getline(fin, newRecord.number)) break;

    yellow.push_back(newRecord);
}
// FIXED input
string search;
cout << "Who are you looking for: ";
cin.ignore();
getline(cin, search);
// SEARCH
bool found = false;
for (int i = 0; i < yellow.size(); i++) {
    if (yellow[i].name == search) {
        cout << yellow[i].number << endl;
        found = true;
    }
}
if (!found) {
    cout << "No match found." << endl;
}
