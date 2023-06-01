use std::fs::File;
use std::io::{BufRead, BufReader};
use std::path::Path;

struct CPU {
    register: i32,
    cycle: i32,
    is_proccessing: bool,
    future_val: i32,
    sum: i32,
}

impl CPU {
    fn new() -> Self {
        CPU {
            register: 1,
            cycle: -1,
            is_proccessing: false,
            future_val: 0,
            sum: 0,
        }
    }
    fn execute(&mut self, instruction: &str) {
        self.cycle += 1;
        if self.cycle % 40 == 20 {
            self.sum += self.register * self.cycle;
            self.show_state();
        }
        if self.is_proccessing {
            self.is_proccessing = false;
            self.execute(&instruction);
        } else {
            if self.future_val != 0 {
                self.register += self.future_val;
                self.future_val = 0;
            }
            match instruction.split_whitespace().next() {
                Some("noop") => {}
                Some("addx") => {
                    let value: i32 = instruction
                        .split_whitespace()
                        .nth(1)
                        .unwrap_or("0")
                        .parse()
                        .unwrap_or(0);
                    self.future_val = value;
                    self.is_proccessing = true;
                }
                _ => {}
            }
        }
    }

    fn read_file(&mut self, path: &str) {
        let path = Path::new(path);
        let file = File::open(&path).unwrap();
        let reader = BufReader::new(file);

        for instruction in reader.lines() {
            let instruction = instruction.unwrap();
            self.execute(&instruction);
        }
    }

    fn show_state(&self) {
        println!(
            "\nCurrent state:\nRegister: {}\nCycle: {}\nSignal strength: {}\nTotal sum:{}",
            self.register,
            self.cycle,
            self.register * self.cycle,
            self.sum,
        );
    }
}

fn main() {
    let mut cpu = CPU::new();
    cpu.read_file("/home/viktor/Documents/GitHub/AdventOfCode/day10/src/source.txt");
    cpu.show_state();
}
