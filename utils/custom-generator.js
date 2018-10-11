const Generator = require('yeoman-generator');
const path = require('path');

class CustomGenerator extends Generator {
  constructor(...args) {
    super(...args);
    this.defaultValues = {};
    this.answers = {};
  }

  async ask(question) {
    const answers = await this.prompt(question);
    this.answers = Object.assign({}, this.answers, answers);
    return this.answers;
  }

  copyTemplate(templatePath, destinationPath) {
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      this.data
    );
  }

  copyTemplates(basePath, templatePaths) {
    templatePaths.forEach(templatePath =>
      this.copyTemplate(
        `${templatePath}.ejs`,
        path.join(basePath, templatePath)
      )
    );
  }

  getValue(key) {
    return this.answers[key] || this.options[key] || this.defaultValues[key];
  }

  setValue(key, value) {
    this.defaultValues[key] = value;
  }
}

module.exports = CustomGenerator;
