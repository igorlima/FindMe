import sbt._
import Keys._
import PlayProject._

object ApplicationBuild extends Build {

    val appName         = "FindMe"
    val appVersion      = "1.0-SNAPSHOT"

    val appDependencies = Seq(
      "mysql"                 % "mysql-connector-java" % "5.1.18",
      "com.google.code.gson"  % "gson" % "2.2.2"
    )

    val main = PlayProject(appName, appVersion, appDependencies, mainLang = JAVA).settings(
      resolvers += "Maven repository" at "http://morphia.googlecode.com/svn/mavenrepo/"      
    )

}
