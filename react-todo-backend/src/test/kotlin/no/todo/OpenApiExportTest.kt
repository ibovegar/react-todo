package no.todo

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import java.io.File

/**
 * Test that exports the OpenAPI specification to a JSON file.
 *
 * This is used by the frontend to generate TypeScript types from the API schema,
 * without needing a running backend instance.
 *
 * Usage:
 *   ./mvnw test -Dtest=OpenApiExportTest
 *
 * Output:
 *   openapi.json (in the project root)
 *
 * The frontend then reads this file to generate types:
 *   cd ../react-todo-frontend && pnpm run generate:api
 */
@SpringBootTest
@AutoConfigureMockMvc
class OpenApiExportTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun `export openapi spec to file`() {
        val result = mockMvc.get("/v3/api-docs")
            .andExpect { status { isOk() } }
            .andReturn()

        val spec = result.response.contentAsString
        val outputFile = File("openapi.json")
        outputFile.writeText(spec)
        println("OpenAPI spec written to ${outputFile.absolutePath}")
    }
}
