use std::fs;
use std::io::Write;
use std::time::Instant;

const FILES_DIR: &str = "files";

fn create_directory() {
    let _ = fs::remove_dir_all(FILES_DIR);
    fs::create_dir(FILES_DIR).unwrap();
}

fn create_file(number: u32) {
    let path = format!("{}/file-{}.txt", FILES_DIR, number);
    fs::File::create(path).unwrap();
}

fn create_many_files() {
    create_directory();
    let start = Instant::now();
    for i in 0..1000 {
        create_file(i);
    }
    println!("create file elapsed: {:?}", start.elapsed());
}

fn write_to_file() {
    fs::File::create("contentFile.txt").unwrap();
    let start = Instant::now();
    for i in 0..1000 {
        let mut f = fs::OpenOptions::new()
            .write(true)
            .append(true)
            .open("contentFile.txt")
            .unwrap();
        writeln!(f, "index is {}", i).unwrap();
    }
    println!("Write file elapsed: {:?}", start.elapsed());
}

fn main() {
    println!("started");
    create_many_files();
    write_to_file();
    println!("finished");
}
