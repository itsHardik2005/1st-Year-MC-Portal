const { validateEnvironment } = require("./config.js");

console.log("=== TEST SUITE: Bot Environment Schema Validation ===\n");

// Test 1: Invalid / Missing values should trigger errors
console.log("--> Test 1: Testing validation failure with invalid environment values...");
try {
  validateEnvironment(
    {
      TELEGRAM_BOT_TOKEN: "invalid-token-no-colon",
      SUPABASE_URL: "http://insecure-site.com",
      SUPABASE_ANON_KEY: "",
      ADMIN_TELEGRAM_ID: "not-a-number",
    },
    false // do not exit process for unit test
  );
  console.error("❌ FAILED: Validation should have thrown an error for invalid inputs!");
} catch (err) {
  console.log("✅ PASSED: Caught expected validation errors:");
  console.log("   " + err.message);
}

// Test 2: Valid values should succeed
console.log("\n--> Test 2: Testing validation success with valid environment values...");
try {
  const validConfig = validateEnvironment(
    {
      TELEGRAM_BOT_TOKEN: "8631409156:AAHIXJjcoTV9csYoXwu_Px2XnmNIZIvv60g",
      SUPABASE_URL: "https://your-project-ref.supabase.co",
      SUPABASE_ANON_KEY: "valid_anon_key_string_example",
      ADMIN_TELEGRAM_ID: "598129384",
    },
    false
  );
  console.log("✅ PASSED: Successfully validated config object:");
  console.log("   Token prefix:", validConfig.TELEGRAM_BOT_TOKEN.split(":")[0]);
  console.log("   Supabase URL:", validConfig.SUPABASE_URL);
  console.log("   Admin ID (string):", validConfig.ADMIN_TELEGRAM_ID);
  console.log("   Admin ID (numeric):", validConfig.ADMIN_TELEGRAM_NUMERIC_ID);
} catch (err) {
  console.error("❌ FAILED: Valid inputs threw unexpected error:", err.message);
}

console.log("\n=== ALL VALIDATION TESTS COMPLETED ===");
