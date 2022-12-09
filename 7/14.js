const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
// var lines = fs.readFileSync('test_input.txt', 'utf-8').split('\n');

let rootFolder = undefined;
let currentFolder = undefined;

const newFolder = (name, parent) => {
  return {
    parent: parent,
    name: name,
    isFolder: true,
    files: {},
    size: 0,
  };
};

const newFile = (name, parent, size) => {
  size = +size;
  return {
    parent: parent,
    name: name,
    isFolder: false,
    size: size,
  };
};

const printFolderStructure = (currentFolder, depth = 0, currentPath = '') => {
  let separator = ' '.repeat(2);
  currentPath = currentFolder.name;
  // print the file line with depth and currentPath
  console.log(`${separator.repeat(depth)}- ${currentPath} (dir, size=${currentFolder.size})`);
  if (currentFolder.files !== undefined) {
    let files = Object.values(currentFolder.files);
    for (file of files) {
      // print a subfolder of this folder and its contents
      if (file.isFolder) {
        printFolderStructure(file, ++depth);
        depth -= 1;
        // print a file in this folder
      } else {
        console.log(`${separator.repeat(depth + 1)}- ${file.name} (file, size=${file.size})`);
      }
    }
  }
};

let lineCount = 0;
let slice = '';
let listingContentsOfFolder = false;
for (line of lines) {
  lineCount += 1;
  line = line.trim();
  let firstChar = line.slice(0, 1);
  if (firstChar === '$') {
    // stop listing contents of folders if this line is a command
    listingContentsOfFolder = false;
    //command
    let [, command, folder] = line.split(' ');
    // console.log(command, folder);
    if (command === 'cd') {
      if (folder === '..') {
        // cd up out of this currentFolder
        currentFolder = currentFolder.parent;
      }
      if (folder !== '..') {
        // add folder, if it does exist, overwrite it (?)
        let dir = newFolder(folder, currentFolder);
        // set folder under parent folder's files
        if (currentFolder !== undefined) {
          currentFolder.files[folder] = dir;
        }
        // cd down into the new folder
        currentFolder = dir;
      }
      // if first command, set the initial folder
      if (folder === '/') {
        rootFolder = currentFolder;
      }
    }
    if (command === 'ls') {
      listingContentsOfFolder = true;
    }
  }
  // if not a command line && if listing contents of folder:
  //  add files and folders to currentFolder
  if (firstChar !== '$' && listingContentsOfFolder) {
    // determine if its a folder or a file
    let isDir = line.slice(0, 3) === 'dir';
    if (isDir) {
      let [, folder] = line.split(' ');
      // its a folder, add it to the currentFolder
      let dir = newFolder(folder, currentFolder);
      // add this folder to the parent folder's files
      if (currentFolder !== undefined) {
        currentFolder.files[folder] = dir;
      }
    }
    if (!isDir) {
      let [filesize, filename] = line.split(' ');
      // its a file, add it to the currentFolder
      let file = newFile(filename, currentFolder, filesize);
      // add this file to the parent folder's files
      if (currentFolder !== undefined) {
        currentFolder.files[file.name] = file;
      }
    }
  }
}

// sums folder file sizes
const sumFolderFileSizes = (currentFile, sum = 0) => {
  if (currentFile.files !== undefined) {
    let allFiles = Object.values(currentFile.files);
    let folders = allFiles.filter((f) => f.isFolder);
    let files = allFiles.filter((f) => !f.isFolder);
    for (folder of folders) {
      sum += sumFolderFileSizes(folder, 0);
    }
    for (file of files) {
      sum += file.size;
    }
  }
  currentFile.size = sum;
  return sum;
};

const captureFoldersLessThanOrEqualToSize = (
  currentFile,
  capturedFolders = [],
  sizeToCaptureBeneath = 100000
) => {
  if (currentFile.isFolder) {
    if (currentFile.size <= sizeToCaptureBeneath) {
      capturedFolders.push(currentFile);
    }
    if (currentFile.files !== undefined) {
      for (file of Object.values(currentFile.files)) {
        capturedFolders = captureFoldersLessThanOrEqualToSize(
          file,
          capturedFolders,
          sizeToCaptureBeneath
        );
      }
    }
  }
  return capturedFolders;
};

const captureFoldersGreaterThanOrEqualToSize = (
  currentFile,
  capturedFolders = [],
  sizeToCaptureAbove = 100000
) => {
  if (currentFile.isFolder) {
    if (currentFile.size >= sizeToCaptureAbove) {
      capturedFolders.push(currentFile);
    }
    if (currentFile.files !== undefined) {
      for (file of Object.values(currentFile.files)) {
        capturedFolders = captureFoldersGreaterThanOrEqualToSize(
          file,
          capturedFolders,
          sizeToCaptureAbove
        );
      }
    }
  }
  return capturedFolders;
};

sumFolderFileSizes(rootFolder);
// printFolderStructure(rootFolder);
let capturedFolders = captureFoldersLessThanOrEqualToSize(rootFolder, [], 100000);
let capturedFileSizes = capturedFolders.map((folder) => folder.size);
let fileSizeSum = capturedFileSizes.reduce((sum, next) => sum + next, 0);
// console.log(capturedFolders);
// console.log(capturedFileSizes);
// console.log(fileSizeSum);

let totalMemory = 70000000;
let spaceRequired = 30000000;
let usedMemory = totalMemory - rootFolder.size;
let memoryToFree = spaceRequired - usedMemory;

let deletableFolders = captureFoldersGreaterThanOrEqualToSize(rootFolder, [], memoryToFree);

console.log(totalMemory, spaceRequired, usedMemory, memoryToFree);
console.log(deletableFolders.map((f) => f.size).sort((a, b) => a - b));
// let smallestFolder
