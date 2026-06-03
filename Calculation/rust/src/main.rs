use std::f64::consts::PI;
use std::time::Instant;

fn leibniz_once(n: f64) -> f64 {
    (-1f64).powf(n) / (2.0 * n + 1.0)
}

fn series_calculation() {
    let mut series_sum: f64 = 0.0;
    let goal = PI / 4.0;
    println!("this is the goal {}", goal);
    let start = Instant::now();
    let mut n = 0u64;
    while (series_sum - goal).abs() > 0.000001 && n < 300000 {
        series_sum += leibniz_once(n as f64);
        n += 1;
    }
    let elapsed = start.elapsed();
    println!("elapsed: {:?} | score: {} ({{ {} }})", elapsed, series_sum, n);
}

fn main() {
    series_calculation();
}
