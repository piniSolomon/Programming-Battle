use std::time::Instant;

const AVG_ITERATIONS: usize = 10;
const MANY_ITERATIONS: usize = 100;

async fn get_once(client: &reqwest::Client, id: usize) -> f64 {
    let start = Instant::now();
    let _ = client
        .get(format!("http://localhost:8000/api/test/{}", id))
        .send()
        .await;
    start.elapsed().as_secs_f64() * 1000.0
}

async fn post_once(client: &reqwest::Client) -> f64 {
    let start = Instant::now();
    let _ = client
        .post("http://localhost:8000/api/test")
        .json(&serde_json::json!({"id": 11}))
        .send()
        .await;
    start.elapsed().as_secs_f64() * 1000.0
}

async fn get_many(client: &reqwest::Client) -> f64 {
    let mut sum = 0.0;
    for i in 0..MANY_ITERATIONS {
        sum += get_once(client, i).await;
    }
    sum / MANY_ITERATIONS as f64
}

async fn post_many(client: &reqwest::Client) -> f64 {
    let mut sum = 0.0;
    for _ in 0..MANY_ITERATIONS {
        sum += post_once(client).await;
    }
    sum / MANY_ITERATIONS as f64
}

async fn avg_get_many(client: &reqwest::Client) {
    let mut sum = 0.0;
    for _ in 0..AVG_ITERATIONS {
        sum += get_many(client).await;
    }
    println!(
        "average of {}*{} GET requests - {}ms",
        AVG_ITERATIONS,
        MANY_ITERATIONS,
        sum / AVG_ITERATIONS as f64
    );
}

async fn avg_post_many(client: &reqwest::Client) {
    let mut sum = 0.0;
    for _ in 0..AVG_ITERATIONS {
        sum += post_many(client).await;
    }
    println!(
        "average of {}*{} POST requests - {}ms",
        AVG_ITERATIONS,
        MANY_ITERATIONS,
        sum / AVG_ITERATIONS as f64
    );
}

#[tokio::main]
async fn main() {
    let client = reqwest::Client::new();
    avg_get_many(&client).await;
    avg_post_many(&client).await;
}
