
// C++ program to count 0s and 1s in an array
#include <iostream>
using namespace std;

void countZeroAndOne(int arr[], int n) {
    int countZero = 0;
    int countOne = 0;
    
    // Count 0s and 1s
    for(int i = 0; i < n; i++) {
        if(arr[i] == 0) {
            countZero++;
        }
        else if(arr[i] == 1) {
            countOne++; 
        }
    }
    
    cout << "Count of 0s: " << countZero << endl;
    cout << "Count of 1s: " << countOne << endl;
}

int main() {
    int arr[] = {0, 1, 0, 1, 1, 1, 0, 0, 0, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    countZeroAndOne(arr, n);
    
    return 0;
}


// // C++ program for linear search
// #include <iostream>
// using namespace std;

// int linearSearch(int arr[], int n, int key) {
//     for (int i = 0; i < n; i++) {
//         if (arr[i] == key) {
//             return i;
//         }
//     }
//     return -1;
// }

// int main() {
//     int arr[] = {2, 3, 4, 10, 40};
//     int n = sizeof(arr) / sizeof(arr[0]);
//     int key = 10;
    
//     int result = linearSearch(arr, n, key);
    
//     if (result == -1) {
//         cout << "Element not found in array";
//     } else {
//         cout << "Element found at index: " << result;
//     }
    
//     return 0;
// }
